import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";4
import { useGetSingleCollectionQuery } from '../src/api/spinsapi'; 
import { fetchCollectionAlbumsById, fetchCollectionById} from "../fetching"
// import styles from "../index.css"; 
import { useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";


export default function SingleCollection ({token, setToken}) {
  const { id } = useParams()
  const [error, setError] = useState(null)
  const backToCollections = useNavigate()
  const [albums, setAlbums] = useState([])
  const [collection, setCollection] = useState({})

  useEffect(() => {
    async function fetchCollection() {
      const res = await fetchCollectionAlbumsById(id)
      const coll_res = await fetchCollectionById(id)
      setAlbums(res)
      setCollection(coll_res)
      console.log(collection)
    }

    fetchCollection()
  }, [])
if (!albums) {
  return
}
console.log(albums)
  return (
    <div key={collection.id} className="singleCollection column">
      <h1>{collection.name}</h1>
      <img src={collection.imgUrl} alt={collection.name} />
      <div className="all-albums-container">
      {albums.map((album) => {
        return (<div className="column">
        <ul key={album.id} className="album-card">
          <Link to={`/albums/${album.id}`}><img src={album.imgUrl} alt={album.title} /></Link>
            <li>{album.title} </li> 
            <li>{album.artist}</li> 
        </ul>
        </div>)

      })}
    </div>
        <button onClick={() => backToCollections('/collections')}>Return To Collections</button>
    </div>
  );
  }
