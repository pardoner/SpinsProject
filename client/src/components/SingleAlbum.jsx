import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetSingleAlbumQuery } from '../api/spinsapi'; 
import { fetchSpotifyAlbumArt} from "../fetching"
import { useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import CollectionPopup from './CollectionPopup';
import ReviewPopup from './ReviewPopup';
import './createCollection.css';
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


export default function SingleAlbum ({token, setToken, spotifyToken}) {
  const { id } = useParams()
  const [error, setError] = useState(null)
  const backToAlbums = useNavigate()
  const addToCollections = useNavigate()
  const addToReviews = useNavigate()
  const [url, setUrl] = useState(null)
  const [createCollection, setCreateCollection] = useState(false);
  const [createReview, setCreateReview] = useState(false);
  const {data: album, error: albumsError, isLoading: albumLoading} = useGetSingleAlbumQuery(id);

  useEffect(() => {
    if(albumLoading){
        return
    }

    fetchSpotifyAlbumArt(album.title, album.artist, spotifyToken).then((response) => {
      if (response) {
        console.log(response)
        setUrl(response)
      }
    })
  }, [])
    
  if (albumLoading) {
            return <div><img className="loading" src="https://www.jimphicdesigns.com/downloads/imgs-mockup/pixelated-hourglass-loading.gif"/></div>;
  }

 if(albumLoading){
        return
    }

    fetchSpotifyAlbumArt(album.title, album.artist, spotifyToken).then((response) => {
      if (response) {
        console.log(response)
        if (!url) {
        setUrl(response)
        }
      }
    })
  return (
    <div key={album.id} className="singleAlbum column">
      <h1>{album.title}</h1>
        <img className="singleArt" src={url} alt={album.title} />
        <h3>{album.artist}</h3> 
        <li className="label">{album.release_date}</li>
        <li>{album.description}</li>
        { Cookies.get("token") ? <button className="btn btn-primary" onClick={()=> setCreateCollection(true)}>Add To Collection</button> : null }
           {Cookies.get("token") ? <CollectionPopup trigger={createCollection} setTrigger={setCreateCollection} token={token}>
          </CollectionPopup> : 
          <button className="btn btn-primary" onClick={()=> backToAlbums("/login")}>Login</button>}
        { Cookies.get("token") ? <button className="btn btn-primary" onClick={()=> setCreateReview(true)}>Write a Review</button> : null }
          <ReviewPopup trigger={createReview} setTrigger={setCreateReview} token={token}>
          </ReviewPopup>
          <br></br>
        <button className="btn btn-primary" onClick={() => backToAlbums('/albums')}>Return To Albums</button>
    </div>
  );
  }
