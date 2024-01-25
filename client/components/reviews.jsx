import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAlbumById, fetchReviews, fetchSpotifyAlbumArt} from "../fetching"
import { useGetReviewsQuery } from '../src/api/spinsapi'; // Import the generated hook from our RTK Query API slice

export default function Reviews({token, spotifyToken}) {
    const [reviews, setReviews] = useState(null)
  
    function ReviewBuilder({revs}) {

        if (!revs) {
            return
        }
        return (
            <div className="all-reviews">
                {revs.map((review) => {
                    <div key={review.id} className="column">
                        <h2>{review.album.title}</h2>    
                        <ul key={review.album.id} className="collection-card">
                            <Link to={`/albums/${review.album.id}`}><img src={review.url} alt={review.album.title}/></Link>
                            <li>{review.album.artist}</li>
                            <li>{review.tags}</li>
                            <li>{review.body}</li>
                            <li>Rating = {review.rating}/10</li>
                        </ul>
                    </div>
                })}
            </div>
            
        )
    }
    async function fetchData() {
        let review_response =  await fetchReviews(token)
        console.log(review_response)
        async function combineReviews(revs) {
            let my_reviews = []
            await Promise.all(
                revs.map(async (review) => {
                    let album = await fetchAlbumById(review.albumId)
                    let url = await fetchSpotifyAlbumArt(album.title, album.artist, spotifyToken)
                    let new_review = { ...review }
                    new_review.album = album;
                    new_review.url = url;
                    console.log(new_review)
                    my_reviews.push(new_review);
            }))
            console.log(my_reviews)
            setReviews(my_reviews)
        }
        await combineReviews(review_response)
        console.log(reviews)

    }
    useEffect(() => {
    fetchData()
    }, [])
    if (!reviews) {
        return
    }

    console.log(reviews)
    return (
        <div>
            <h1>Reviews</h1>
            <div className="all-reviews">
                {reviews.map((review) => {
                    console.log("here")
                    return (
                    <div key={review.id} className="column">
                        <h2>{review.album.title}</h2>    
                        <ul key={review.album.id} className="collection-card">
                            <Link to={`/albums/${review.album.id}`}><img src={review.url} alt={review.album.title}/></Link>
                            <li>{review.album.artist}</li>
                            <li>{review.tags}</li>
                            <li>{review.body}</li>
                            <li>Rating = {review.rating}/10</li>
                        </ul>
                    </div>
                    )
                })}
            </div>
        </div>
    );
}