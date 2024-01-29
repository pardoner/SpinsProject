import React from 'react';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import {useState} from 'react';
import { makeReview, editReview } from '../fetching';
import { Rating } from 'react-simple-star-rating';
import { useGetReviewsQuery } from '../api/spinsapi'; 


function ReviewPopup(props) {
    const { id } = useParams()
    const [newReview, setNewReview] = useState("Write a review")
    const [rating, setRating] = useState(0)
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [currentDate, setCurrentDate] = useState(new Date());

console.log(props.review)
    function handleRating(rate) {
        setRating(rate)
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (props.review) {
            updateReview()
            props.setTrigger(false)
        } else {
            createNewReview()
        props.setTrigger(false)

        }
        alert('Added new review');
    }

    async function createNewReview() {
        console.log(`trying to make new review with token: ${props.token}`)
        if (props.token) {
            let newReview = await makeReview({albumId: id, tags: tags, body: body, rating: rating, date: currentDate}, props.token)
        }
    }

    async function updateReview() {
         let editedReview =  await editReview({id: props.review.id, tags: tags, body: body, rating: rating, date: currentDate, albumId: props.review.albumId}, props.token)
        console.log(editedReview)
        console.log("from")
        console.log(props.review)
        // refresh page once if goes through 
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