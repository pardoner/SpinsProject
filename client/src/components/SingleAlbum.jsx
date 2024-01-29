import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetSingleAlbumQuery } from '../api/spinsapi'; 
import { fetchAlbumById, fetchSpotifyAlbumArt} from "../fetching"
import { useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import CollectionPopup from './CollectionPopup';
import ReviewPopup from './ReviewPopup';
import './createCollection.css';


export default function SingleAlbum ({token, setToken, spotifyToken}) {
  const { id } = useParams()
  const [error, setError] = useState(null)
  const backToAlbums = useNavigate()
  const addToCollections = useNavigate()
  const addToReviews = useNavigate()
  const [album, setAlbum] = useState(null)
  const [url, setUrl] = useState(null)
  const [createCollection, setCreateCollection] = useState(false);
  const [createReview, setCreateReview] = useState(false);

  useEffect(() => {
    async function fetchAlbum() {
      const res = await fetchAlbumById(id).then( (res) => {
        setUrl(res.imgUrl)
        console.log(res)
        async function fetchArt() {
          fetchSpotifyAlbumArt(res.title, res.artist, spotifyToken).then((response) => {
            if (response) {
              console.log(response)
              setUrl(response)
            }

          })
        }
        fetchArt()
        setAlbum(res)
      })
    }

    fetchAlbum()

  }, [])
if (!album) {
  return
}
  return (
    <div key={album.id} className="singleAlbum column">
      <h1>{album.title}</h1>
        <img className="singleArt" src={url} alt={album.title} />
        <h3>{album.artist}</h3> 
        <li className="label">{album.release_date}</li>
        <li>{album.description}</li>
        { token? <button className="btn btn-primary" onClick={()=> setCreateCollection(true)}>Add To Collection</button> : null }
           { token ? <CollectionPopup trigger={createCollection} setTrigger={setCreateCollection} token={token}>
          </CollectionPopup> : 
          <button className="btn btn-primary" onClick={()=> backToAlbums("/login")}>Login</button>}
        { token ? <button className="btn btn-primary" onClick={()=> setCreateReview(true)}>Write a Review</button> : null }
          <ReviewPopup trigger={createReview} setTrigger={setCreateReview} token={token}>
          </ReviewPopup>
          <br></br>
        <button className="btn btn-primary" onClick={() => backToAlbums('/albums')}>Return To Albums</button>
    </div>
  );
  }
