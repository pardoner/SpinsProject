import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";4
import { useGetSingleCollectionQuery, useDeleteCollectionMutation, useDeleteCollectionAlbumMutation, useGetCollectionAlbumsQuery } from '../api/spinsapi'; 
import { fetchSpotifyAlbumArt } from "../fetching";
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
  const [urls, setUrls] = useState([])
  const [collection, setCollection] = useState({})
  const nav = useNavigate()
  const {data: singleCollection, error: collectionError, isLoading: collectionLoading} = useGetSingleCollectionQuery(id, token);
  const {data: collectionAlbums, error: albumsError, isLoading: albumsLoading} = useGetCollectionAlbumsQuery(id, token);
  const [deleteCollection, {error: deleteCollectionError, isLoading: deleteCollectionLoading}] = useDeleteCollectionMutation();
  const [deleteCollectionAlbum, {error: deleteCollectionAlbumError, isLoading: deleteCollectionAlbumLoading}] = useDeleteCollectionAlbumMutation();

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {

    async function fetchCollection() {
        async function fetchArt(albs_arr) {
          //setAlbums([])
          let new_albs = []
          let new_urls = []
          for (const album of albs_arr) {
            console.log(album)
            let url = await fetchSpotifyAlbumArt(album.title, album.artist, spotifyToken)
            new_albs.push(album)
            new_urls.push(url)

          }
          setUrls(new_urls)
          setAlbums(new_albs)
        }
        if (collectionAlbums) {
        await fetchArt(collectionAlbums)
        }

    }

    fetchCollection()
  }, [collectionAlbums])

async function removeAlbum(album_id) {
   let removedAlbum = await deleteCollectionAlbum({album_id, token, id}).then()
    console.log(removedAlbum)
  }

async function deleteSelectedCollection() {
  let deletedCollection = await deleteCollection({id, token})
  nav('/collections')

}

  if (collectionLoading|| albumsLoading ) {
      return <div><img className="loading" src="https://www.jimphicdesigns.com/downloads/imgs-mockup/pixelated-hourglass-loading.gif"/></div>
  }
  
  console.log(albums)
return (
  <>
  <div key={id} className="singleCollection column">
    <h1>{collection.name}</h1>
    <div className="single-collection-container">
      {albums.map((album) => {
        return (
        <ul key={album.id} className="single-collection-card m-3 p-3 border shadow">
          <Link to={`/albums/${album.id}`}><img src={urls[albums.indexOf(album)]} alt={album.title} /></Link>
            <li>{album.title} </li> 
            <li>{album.artist}</li> 
             <button className="btn btn-outline-secondary" onClick={() => removeAlbum(album.id)}>Remove</button>
        </ul>)
      })}
    </div>
  </div>
        <button className="btn btn-secondary" onClick={() => deleteSelectedCollection()}>Delete Collection</button>
        <button className="btn btn-secondary" onClick={() => backToCollections('/collections')}>Return To Collections</button>
  </>
  );
  }
