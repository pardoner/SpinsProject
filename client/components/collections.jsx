import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetCollectionsQuery } from '../src/api/spinsapi'; // Import the generated hook from our RTK Query API slice

export default function Collections ({token}) {
  const { data, error, isLoading } = useGetCollectionsQuery(token);

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
      <h1>Collection</h1>
      <div className="all-collections-container">
        {
        data.map((collection) => {
          return (
            <div className="column" key={collection.id} >
            <Link to={`/collections/${collection.id}`}><h2>{collection.name}</h2> </Link>  
            <img src={collection.imgUrl} alt={collection.name} />
            <ul className="collection-card">
            </ul>
            </div>
          )
        })}
      </div>
     </div> 
    );
}