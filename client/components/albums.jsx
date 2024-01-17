
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchAlbums } from '../fetching'; // Import the generated hook from our RTK Query API slice

export default function Albums () {
  const { data = {}, error, isLoading } = fetchAlbums();
  const searchBar = () => {}
  const [searchInput, setSearchInput] = useState("");

    if (isLoading) {
        return <div className={styles.loading}>Loading...</div>; 
    }

    if (error) {
      return <div className={styles.error}>Error: {error.message}</div>; 
    }
  

    function handleChange(e) {
      e.preventDefault();
      setSearchInput(e.target.value);
    }

    return (
      <div>
      <h1>Albums</h1>
      <p id="pickAlbum">Select an album to see more details.</p>
        <input onInput={(e)=> handleChange(e)}></input>
      <div className="all-albums-container">
        {data.books.filter((album) => {
          return book.title.toLowerCase().startsWith(searchInput.toLowerCase()) || searchInput == ""
        }).map((book) => {
          return (
            <div className="column">
            <ul key={book.id} className="album-card">
              <Link to={`/albums/${album.id}`}><img src={album.imgUrl} alt={album.title} /></Link>
                <li>{album.title} </li> 
                <li>{album.artist}</li> 
            </ul>
            </div>
          )
        })}
      </div>
     </div> 
    );

 
}