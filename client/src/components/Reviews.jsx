import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { fetchAlbumById, fetchReviews, fetchSpotifyAlbumArt, deleteReview, editReview } from "../fetching"
import { Rating } from 'react-simple-star-rating';
import ReviewPopup from './ReviewPopup';
import { useGetReviewsQuery } from '../api/spinsapi'; 
import Cookies from 'js-cookie';

const tryGetToken = (token) => {
    if (token) {
        return token
    }

    const cookie_token = Cookies.get("token")
    if (cookie_token) {
        return cookie_token
    } else {
        return null
    }
}

export default function Reviews({token, spotifyToken}) {
    const [reviews, setReviews] = useState([])
     const [editReview, setEditReview] = useState(false);
     const [reviewToEdit, setReviewToEdit] = useState();
    const nav = useNavigate();

function reviewDate(date) {
    let newDate = date.slice(0, 10);
    return newDate;
}

    useEffect(() => {
        async function fetchData() {
        let review_response =  await fetchReviews(token)

        async function combineReviews(revs) {
            let my_reviews = []
            await Promise.all(
                revs.map(async (review) => {
                    let album = await fetchAlbumById(review.albumId)
                    let url = await fetchSpotifyAlbumArt(album.title, album.artist, spotifyToken)
                    let new_review = { ...review }
                    new_review.album = album;
                    new_review.url = url;
                    my_reviews.push(new_review);
            }))
            setReviews(my_reviews)
        }

        await combineReviews(review_response)
        }
        if (Cookies.get("token")) {
            fetchData()
        }
    }, [])

    async function removeReview(review_id) {
         let removedReview =  await deleteReview(review_id, token)
        console.log(removedReview)
     }


    function prepEditReview(review) {
        setReviewToEdit(review)
        setEditReview(true)
        console.log(review)
    }

    console.log(reviews)
    return (
        <div>
            <h1>Reviews</h1>
            <br></br>
            <div className="all-reviews">
                {Cookies.get("token") ? <p>Go to the <a href="/albums">albums</a> page to write a review.</p> : <p>Log in or create an account to start reviewing!</p>}
                {reviews.map((review) => {
                    return (
                    <div key={review.id} className="column">
                        <h2>{review.album.title}</h2>    
                        <ul key={review.album.id} className="collection-card m-3 p-3 border shadow">
                            <Link to={`/albums/${review.album.id}`}><img src={review.url} alt={review.album.title}/></Link>
                            <li>{review.album.artist}</li>
                            <Rating initialValue={review.rating} readonly={true}/>
                            <li>{reviewDate(review.date)}</li>
                            <li>{review.tags}</li>
                            <li>{review.body}</li>
                        </ul>
                        <button className="btn btn-secondary" onClick={()=> prepEditReview(review)}>Edit</button>
                        
                        <button className="btn btn-secondary" onClick={() => removeReview(review.id)}>Delete</button>
                    </div>
                    )
                })}
                <ReviewPopup review={reviewToEdit} setReview={setReviewToEdit} trigger={editReview} setTrigger={setEditReview} token={token}>
                </ReviewPopup>
            </div>
        </div>
    );
}
