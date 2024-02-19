import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { fetchSpotifyAlbumArt } from "../fetching"
import { Rating } from 'react-simple-star-rating';
import ReviewPopup from './ReviewPopup';
import { useGetReviewsQuery, useGetSingleAlbumQuery, useDeleteReviewMutation, useEditReviewMutation, useLazyGetSingleAlbumQuery } from '../api/spinsapi'; 
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
     const [editReview, setEditReview] = useState(false);
     const [reviews, setReviews] = useState([])
     const [reviewToEdit, setReviewToEdit] = useState();
     const nav = useNavigate();
     const [albumId, setAlbumId] = useState(1)
     const {data: review_data = [], error: reviewsError, isLoading: reviewsLoading} = useGetReviewsQuery(token);
     const [deleteReview, {error: deleteReviewError, isLoading: reviewDeletionLoading}] = useDeleteReviewMutation();
     const [updateReview, {error: editReviewError, isLoading: reviewEditLoading}] = useEditReviewMutation();
     const [useGetAlbum, data, lastPromise] = useLazyGetSingleAlbumQuery();

    useEffect(() => {
        async function fetchData() {
            console.log(review_data)

            async function combineReviews(revs) {
                let my_reviews = []
                for (const review of revs) {
                    console.log(review)
                    setAlbumId(review.albumId)
                    const {data: album} = await useGetAlbum(review.albumId)
                    console.log(album)
                    let url = await fetchSpotifyAlbumArt(album.title, album.artist, spotifyToken)
                    let new_review = { ...review }
                    new_review.album = album;
                    new_review.url = url;
                    my_reviews.push(new_review);
                }
                if (!(reviews.length == 0 && my_reviews.length == 0)){
                    setReviews(my_reviews)
                }

            }
            await combineReviews(review_data)

        }

        if (Cookies.get("token")) {
            fetchData()
        }
        console.log(reviews)
    }, [review_data])
    
    
    function reviewDate(date) {
        let newDate = date.slice(0, 10);
        return newDate;
    }
    async function removeReview(review_id) {
            let removedReview =  await deleteReview(review_id, token)
        console.log(removedReview)
        }


    function prepEditReview(review) {
        setReviewToEdit(review)
        setEditReview(true)
        console.log(review)
    }

    if (reviewsLoading) {
            return <div><img className="loading" src="https://www.jimphicdesigns.com/downloads/imgs-mockup/pixelated-hourglass-loading.gif"/></div>;
    }

    return (
        <div className="review-page">
            <h1>Reviews</h1>
            <br></br>
            <div className="all-reviews">
                {Cookies.get("token") ? <p>Go to the <a href="/albums">albums</a> page to write a review.</p> : <p>Log in or create an account to start reviewing!</p>}
                {reviews.map((review) => {
                    console.log(review.id)
                    return (
                    <div key={review.id} className="collection-card m-3 p-3 border shadow">
                        <h2>{review.album.title}</h2>    
                        <ul key={review.album.id}>
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
