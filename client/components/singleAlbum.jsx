import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";4
import { useGetSingleAlbumQuery } from '../src/api/spinsapi'; 
import { fetchAlbumById, fetchSpotifyAlbumArt} from "../fetching"
// import styles from "../index.css"; 
import { useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import CollectionPopup from './collectionPopup';
import ReviewPopup from './collectionPopup';
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
        async function fetchArt() {
          fetchSpotifyAlbumArt(res.title, res.artist, spotifyToken).then((response) => {
            setUrl(response)
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
        <img src={url} alt={album.title} />
        <li>{album.artist}</li> 
        <li>{album.release_date}</li>
        <li>{album.description}</li>
        <button onClick={()=> setCreateCollection(true)}>Add To Collection</button>
          <CollectionPopup trigger={createCollection} setTrigger={setCreateCollection} token={token}>
          </CollectionPopup>
        <button onClick={()=> setCreateCollection(true)}>Write a Review</button>
          <ReviewPopup trigger={createReview} setTrigger={setCreateReview} token={token}>
          </ReviewPopup>
        <button onClick={() => backToAlbums('/albums')}>Return To Albums</button>
    </div>
  );
  }
