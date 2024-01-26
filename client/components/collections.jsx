import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useGetCollectionsQuery } from '../src/api/spinsapi'; // Import the generated hook from our RTK Query API slice

export default function Collections ({token}) {
  const { data, error, isLoading } = useGetCollectionsQuery(token);
  const nav = useNavigate();

  if (isLoading) {
      return <div>Loading...</div>; // is styles.loading pre-programmed?
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  console.log(data)
  function handleChange(e) {
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  return (
      <div>
      <h1>Collections</h1>
      {token ? <p>Go to the <a href="/albums">albums</a> page to add to a collection.</p> : <p>Log in or create an account to start collecting!</p>}
      <div className="all-collections-container">
        {
        data.map((collection) => {
          return (
            <div className="column" key={collection.id} >
            <Link to={`/collections/${collection.id}`}><h2 className="all-collections">{collection.name}</h2> </Link>  
            <ul className="collection-card">
            </ul>
            </div>
          )
        })}
      </div>
     </div> 
    );
}