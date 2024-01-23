import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";4
import { useGetSingleCollectionQuery } from '../src/api/spinsapi'; 
import { fetchCollectionAlbumsById, fetchCollectionById, fetchSpotifyAlbumArt} from "../fetching"
// import styles from "../index.css"; 
import { useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";


export default function SingleCollection ({token, setToken, spotifyToken}) {
  const { id } = useParams()
  const [error, setError] = useState(null)
  const backToCollections = useNavigate()
  const [albums, setAlbums] = useState([])
  const [collection, setCollection] = useState({})
  useEffect(() => {
    async function fetchCollection() {
      let res = await fetchCollectionAlbumsById(id)
      const coll_res = await fetchCollectionById(id)
      setCollection(coll_res)
      async function fetchArt(albs) {
        await albs.forEach(async (album) => {
          let url = await fetchSpotifyAlbumArt(album.title, album.artist, spotifyToken)
          album.imgUrl = url
          albums.push(album)
        })
      }
      fetchArt(res)
      console.log(res)
    }

    fetchCollection()
  }, [])

if (albums.length == 0) {
  return
}
console.log(albums)
return (
  <div key={collection.id} className="singleCollection column">
    <h1>{collection.name}</h1>
    <img src={collection.url} alt={collection.name} />
    <div className="all-albums-container">
      {albums.map((album) => {
        console.log(album.imgUrl)
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
