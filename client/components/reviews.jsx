import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";4
import { fetchAlbumById, fetchReviews} from "../fetching"
import { useGetReviewsQuery } from '../src/api/spinsapi'; // Import the generated hook from our RTK Query API slice

export default function Review (token) {
    const [reviews, setReviews] = useState([])
  
  useEffect(() => {
    setReviews([])
    async function fetchData() {
        let review_response =  await fetchReviews(token.token)
        review_response.map(async (review) => {
            let album = await fetchAlbumById(review.albumId)
            let new_review = Object.create(review)
            new_review.album = album;
            setReviews([...reviews, new_review])
        })
    }

    fetchData()
   }, [])

  return (
      <div>
      <h1>Review</h1>
      <p>Make a new review</p>
        <input onInput={(e)=> handleChange(e)}></input>
      <div className="all-reviews">
      {
        reviews.map((review) => {
            return (
                <div key={review.id} className="column">
                <h2>{review.album.title}</h2>    
                <ul key={review.id} className="collection-card">
                    <li><img src={review.album.imgUrl} alt={review.album.title}/></li>
                    <li>{review.album.artist}</li>
                    <li>{review.tags}</li>
                    <li>{review.body}</li>
                    <li>Rating: {review.rating}/10</li>
                </ul>
                </div>
            )
        })}
         </div>
      </div>
    );
}