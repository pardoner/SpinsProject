import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";4
import { useGetSingleCollectionQuery } from '../src/api/spinsapi'; 
import { fetchCollectionAlbumsById, fetchCollectionById, fetchSpotifyAlbumArt, deleteCollectionAlbum, deleteCollectionById} from "../fetching"
// import styles from "../index.css"; 
import { useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";


export default function SingleCollection ({token, setToken, spotifyToken}) {
  const { id } = useParams()
  const [error, setError] = useState(null)
  const backToCollections = useNavigate()
  const [albums, setAlbums] = useState([])
  const [collection, setCollection] = useState({})
  const nav = useNavigate()
  // const [
  //   removedAlbum,
  //   { isLoading: isRemoving },
  // ] = deleteCollectionEntry();

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

async function removeAlbum(album_id) {
    let removedAlbum = await deleteCollectionAlbum(album_id, token, id)
    console.log(removedAlbum)
    // refetch()
    // refresh page once if goes through 
  }

async function deleteCollection() {
  let deletedCollection = await deleteCollectionById(id, token)
  // more stuff
  nav('/collections')

}

return (
  <div key={id} className="singleCollection column">
    <h1>{collection.name}</h1>
    <div className="all-albums-container">
      {albums.map((album) => {
        console.log(album.imgUrl)
        return (
        <ul key={album.id} className="album-card">
          <Link to={`/albums/${album.id}`}><img src={album.imgUrl} alt={album.title} /></Link>
            <li>{album.title} </li> 
            <li>{album.artist}</li> 
             <button onClick={() => removeAlbum(album.id)}>Remove</button>
        </ul>)
      })}
    </div>
    <button onClick={() => deleteCollection()}>Delete Collection</button>
    <button onClick={() => backToCollections('/collections')}>Return To Collections</button>
  </div>
  );
  }
