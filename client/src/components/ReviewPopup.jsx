import React from 'react';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import {useState} from 'react';
import { Rating } from 'react-simple-star-rating';
import { useGetReviewsQuery, useEditReviewMutation, useAddReviewMutation } from '../api/spinsapi'; 
import Cookies from 'js-cookie';


function ReviewPopup(props) {
    const { id } = useParams()
    const [newReview, setNewReview] = useState("Write a review")
    const [rating, setRating] = useState(0)
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [currentDate, setCurrentDate] = useState(new Date());

    const [updateReview, {error: reviewsEditError, isLoading: editLoading}] = useEditReviewMutation();
    const [addReview, {error: reviewAddError, isLoading: reviewingAddLoading}] = useAddReviewMutation();


    function handleRating(rate) {
        console.log(rate)
        setRating(rate)
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (props.review) {
            sendUpdateReview()
            props.setTrigger(false)
        } else {
            createNewReview()
        props.setTrigger(false)

        }
        alert('Added new review');
    }


    async function createNewReview() {
        if (Cookies.get("token")) {
            let newReview = await addReview({albumId: id, tags: tags, body: body, rating: rating, date: currentDate}, props.token)
        }
    }

    async function sendUpdateReview() {
         let editedReview =  await updateReview({id: props.review.id, tags: tags, body: body, rating: rating, date: currentDate, albumId: props.review.albumId}, props.token)
        console.log(editedReview)
        console.log("from")
        console.log(props.review)
     }

    let handleReviewChange = (e) => {
        setBody(e.target.value)
    }

    let handleTagsChange = (e) => {
        setTags(e.target.value)
    }
  
    return (props.trigger) ? (
    <div className = "popUp">
        <div className="popUp-inner">
        <h3>Write a Review</h3>
            <p>{currentDate.toLocaleString()}</p>
            <form onSubmit={handleSubmit}>
                <Rating 
                onClick={handleRating}
                initialValue={props.review && props.review.rating}
                />
                <br></br>
                <label> Tags: 
                <textarea name="tags" onChange={handleTagsChange} placeholder="genres, moods, themes"></textarea>
                </label>
                <br></br>
                <label> Thoughts: 
                <textarea name="body" onChange={handleReviewChange} rows="3" placeholder="Standout tracks? Recommended for fans of..."></textarea>
                </label>
                <button className="closeButton btn btn-secondary" >Submit</button>
                {props.children}
            </form>    
        </div>
    </div>
    ) : "";
}

export default ReviewPopup;
