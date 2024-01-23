import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";4
import { useGetCollectionsQuery } from '../src/api/spinsapi'; // Import the generated hook from our RTK Query API slice

export default function Collections () {
  const { data, error, isLoading } = useGetCollectionsQuery();

  if (isLoading) {
      return <div>Loading...</div>; // is styles.loading pre-programmed?
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  function handleChange(e) {
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  console.log(data)
  return (
      <div>
      <h1>Collection</h1>
      <div className="all-collections-container">
        {
        data.map((collection) => {
          console.log(data)
          return (
            <div className="column">
            <Link to={`/collections/${collection.id}`}><h2>{collection.name}</h2> </Link>  
            <img src={collection.imgUrl} alt={collection.name} />
            <ul key={collection.id} className="collection-card">
            </ul>
            </div>
          )
        })}
      </div>
     </div> 
    );
}