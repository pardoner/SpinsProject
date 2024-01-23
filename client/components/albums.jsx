import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";4
import { useGetAlbumsQuery } from '../src/api/spinsapi'; // Import the generated hook from our RTK Query API slice
import ReactPaginate from 'react-paginate';

export default function Albums () {
  const { data, error, isLoading } = useGetAlbumsQuery();
  const searchBar = () => {}
  const [searchInput, setSearchInput] = useState("");

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

  function BuildItems({albums}) {
     return albums.map((album) => {
      console.log(album)
      album.imgUrl = fetchSpotifyAlbumArt(album.title, album.artist) //TODO implement fetch
      return (
        <div className="column">
          <ul key={album.id} className="album-card">
            <Link to={`/albums/${album.id}`}><img src={album.imgUrl} alt={album.title} /></Link>
            <li>{album.title} </li> 
            <li>{album.artist}</li> 
          </ul>
        </div>
      )
    })
  }

  function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading albums from ${itemOffset} to ${endOffset}`);
    let items = data.filter((album) => {
      if (album.artist.toLowerCase().startsWith(searchInput.toLowerCase()) || searchInput == ""){
      return true;
      }
      if (album.title.toLowerCase().startsWith(searchInput.toLowerCase()) || searchInput == "") {
        return true;
      }
      return false;
    })
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    }
    return (
      <>
        <BuildItems albums={items} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  console.log(data)
  return (
      <div>
      <h1>Albums</h1>
      <p id="pickAlbum">Select an album to see more details.</p>
        <input onInput={(e)=> handleChange(e)}></input>
        {data && <PaginatedItems itemsPerPage={20} />}
     </div> 
    );
}