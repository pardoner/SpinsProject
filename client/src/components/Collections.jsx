import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useGetCollectionsQuery } from '../api/spinsapi'; // Import the generated hook from our RTK Query API slice
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

export default function Collections ({token}) {
  
  const { data, error, isLoading } = useGetCollectionsQuery(token);
  const nav = useNavigate();

  if (isLoading) {
      return <div><img className="loading" src="https://www.jimphicdesigns.com/downloads/imgs-mockup/pixelated-hourglass-loading.gif"/></div>
  }

  if (error && error.status == 401) {
    return <p>Log in or create an account to start collecting!</p>
  }

  console.log(data)
  function handleChange(e) {
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  return (
      <div>
      <h1>Collections</h1>
      <br></br>
      { Cookies.get("token") ? <p>Go to the <a href="/albums">albums</a> page to add to a collection. Select a collection to see your records.</p> : <p>Log in or create an account to start collecting!</p>}
      { Cookies.get("token") && 
      <div className="all-collections-container">
        {
        data.map((collection) => {
          return (
            <div className="collection text-white bg-primary m-5 p-5" key={collection.id} >
            <Link className="text-white"to={`/collections/${collection.id}`}><h2 className="all-collections">{collection.name}</h2> </Link>  
            <ul className="col collection-card">
            </ul>
            </div>
          )
        })}
      </div>
      }
     </div> 
    );
}
