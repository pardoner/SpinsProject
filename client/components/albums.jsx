import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetAlbumsQuery } from '../src/api/spinsapi';
import ReactPaginate from 'react-paginate';
import { fetchSpotifyAlbumArt, fetchSpotifyToken } from '../fetching'

export default function Albums ({spotifyToken, setSpotifyToken}) {
  const { data, error, isLoading } = useGetAlbumsQuery();
  const searchBar = () => {}
  const [searchInput, setSearchInput] = useState("");
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  let currentItems = []

 useEffect(() =>
  {
    async function getToken() {
      await fetchSpotifyToken().then(resp =>
        {
          setSpotifyToken(resp.access_token)
        })
    }
    getToken()
  }, [])

  if (isLoading) {
      return <div><img className="loading" src="https://www.jimphicdesigns.com/downloads/imgs-mockup/pixelated-hourglass-loading.gif"/></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }
  
  if (!data) {
    return
  }


  function handleChange(e) {
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  function BuildItems({albums}) {
    return albums.map((album) => {
      return (
        <Item key={album.id} album={album}/>
      )
    })
  }

  function Item({album}) {
    const [state, setState] = useState({
      isLoadingAlbum: true,
      url: album.imgUrl
    });

    useEffect(() => {
      const getDataWrapper = async () => {
        const response = await await fetchSpotifyAlbumArt(album.title, album.artist, spotifyToken)
        setState({
          isLoading: false,
          url: response
        });
      }

      getDataWrapper();
    }, []);

    return (
        <ul className="album-card m-3 p-3 border shadow" key={album.id}>
            <Link to={`/albums/${album.id}`}><img className="albumImg" src={state.url} alt={album.title} /></Link>
            <li key="album">{album.title} </li> 
            <li key="artist">{album.artist}</li> 
        </ul>
    )
  }

  function PaginatedItems({ itemsPerPage }) {
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
    currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    }
    if (isLoadingAlbums) {
        return <div>Loading albums...</div>;
    }

    return (
      <>
        <div className="all-albums-container">
          <BuildItems albums={currentItems} />
          </div>
      <div className="pages">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
        </div>
      </>
    );
  }

  return (
      <div>
      <h1>Albums</h1>
      <p id="pickAlbum">Select an album to see more details.</p>
      <p>Search for an album by title or artist name: 
     <input onInput={(e)=> handleChange(e)}></input>
     </p>
        {data && <PaginatedItems itemsPerPage={20} />}
     </div> 
    );
}