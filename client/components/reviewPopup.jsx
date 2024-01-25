import React from 'react';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import {useState} from 'react';
import { makeReview } from '../fetching';
import { Rating } from 'react-simple-star-rating';
import { useGetReviewsQuery } from '../src/api/spinsapi'; // Import the generated hook from our RTK Query API slice


function ReviewPopup(props) {
    const { id } = useParams()
    const [newReview, setNewReview] = useState("Write a review")
    const [rating, setRating] = useState(0)
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [currentDate, setCurrentDate] = useState(new Date());

    function handleRating(rate) {
        setRating(rate)
    }

    function handleSubmit(event) {
        event.preventDefault();

        createNewReview(body)
        props.setTrigger(false)
        alert('Added new review');
    }

    function createNewReview(album) {
        console.log(`trying to make new review with token: ${props.token}`)
        if (props.token) {
            makeReview({albumId: id, tags: tags, body: body, rating: rating}, props.token)
            .catch(rejected => {
                setError(rejected)
        })
        }
    }

    let handleReviewChange = (e) => {
        setBody(e.target.value)
        setTags(e.target.value)
    }

    let handleTagsChange = (e) => {
        setTags(e.target.value)
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []) 
  
    return (props.trigger) ? (
    <div className = "popUp">
        <div className="popUp-inner">
        <h3>Write a Review</h3>
            <p>{currentDate.toLocaleString()}</p>
            <form onSubmit={handleSubmit}>
                <Rating 
                onClick={handleRating}
                />
                <br></br>
                <label> Tags: 
                <textarea name="tags" onChange={handleTagsChange} placeholder="genres, moods, themes"></textarea>
                </label>
                <br></br>
                <label> Thoughts: 
                <textarea name="body" onChange={handleReviewChange} placeholder="Standout tracks? Recommended for fans of..."></textarea>
                </label>
                <button className="closeButton" >Submit</button>
                {props.children}
            </form>    
        </div>
    </div>
    ) : "";
}

export default ReviewPopup;