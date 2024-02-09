import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";4
import { useGetSingleCollectionQuery } from '../api/spinsapi'; 
import { fetchCollectionAlbumsById, fetchCollectionById, fetchSpotifyAlbumArt, deleteCollectionAlbum, deleteCollectionById} from "../fetching";
import { useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


export default function SingleCollection ({token, setToken, spotifyToken}) {
  const { id } = useParams()
  const [error, setError] = useState(null)
  const backToCollections = useNavigate()
  const [albums, setAlbums] = useState([])
  const [collection, setCollection] = useState({})
  const nav = useNavigate()

  useEffect(() => {
    async function fetchCollection() {
      let res = await fetchCollectionAlbumsById(id, token)
      const coll_res = await fetchCollectionById(id, token)
      setCollection(coll_res)
      console.log(coll_res)
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

async function removeAlbum(album_id) {
   let removedAlbum = await deleteCollectionAlbum(album_id, token, id).then(res => setAlbums(res))
    console.log(removedAlbum)
  }

async function deleteCollection() {
  let deletedCollection = await deleteCollectionById(id, token)
  nav('/collections')

}

return (
  <>
  <div key={id} className="singleCollection column">
    <h1>{collection.name}</h1>
    <div className="single-collection-container">
      {albums.map((album) => {
        console.log(album.imgUrl)
        return (
        <ul key={album.id} className="single-collection-card m-3 p-3 border shadow">
          <Link to={`/albums/${album.id}`}><img src={album.imgUrl} alt={album.title} /></Link>
            <li>{album.title} </li> 
            <li>{album.artist}</li> 
             <button className="btn btn-outline-secondary" onClick={() => removeAlbum(album.id)}>Remove</button>
        </ul>)
      })}
    </div>
  </div>
        <button className="btn btn-secondary" onClick={() => deleteCollection()}>Delete Collection</button>
        <button className="btn btn-secondary" onClick={() => backToCollections('/collections')}>Return To Collections</button>
  </>
  );
  }
