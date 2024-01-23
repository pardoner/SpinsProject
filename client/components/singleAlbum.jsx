import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";4
import { useGetSingleAlbumQuery } from '../src/api/spinsapi'; 
import { fetchAlbumById} from "../fetching"
// import styles from "../index.css"; 
import { useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import CreateCollection from './createCollection';
import './createCollection.css';


export default function SingleAlbum ({token, setToken}) {
  const { id } = useParams()
  const [error, setError] = useState(null)
  const backToAlbums = useNavigate()
  const addToCollections = useNavigate()
  const addToReviews = useNavigate()
  const [album, setAlbum] = useState(null)
  const [createCollection, setCreateCollection] = useState(false);

  useEffect(() => {
    async function fetchAlbum() {
      const res = await fetchAlbumById(id)
      setAlbum(res)
      console.log(album)
    }

    fetchAlbum()
  }, [])
if (!album) {
  return
}
  return (
    <div key={album.id} className="singleAlbum column">
      <h1>{album.title}</h1>
        <img src={album.imgUrl} alt={album.title} />
        <li>{album.artist}</li> 
        <li>{album.release_date}</li>
        <li>{album.description}</li>
        <button onClick={()=> setCreateCollection(true)}>Add To Collection</button>
          <CreateCollection trigger={createCollection} setTrigger={setCreateCollection}>
              <h3>My Collections</h3>
              <p>This is my button triggered popup</p>
          </CreateCollection>
        <button onClick={() => addToReviews('/reviews')}>Review Album</button>
        <button onClick={() => backToAlbums('/albums')}>Return To Albums</button>
    </div>
  );
  }
