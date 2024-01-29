/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { Routes, Route, Link } from "react-router-dom";
import Albums from './Albums';
import Collections from "./Collections";
import Register from './Register';
import Reviews from './Reviews';
import Login from './Login';
import Account from './Account';
import SingleAlbum from './SingleAlbum';
import Home from './Home';
import SingleCollection from './SingleCollection';

// changed name

export default function Navigations({token, setToken, spotifyToken, setSpotifyToken}) {

  return (
    <div id="container">
    <div id="navbar">
      <Link to="/albums"> Albums</Link>
      <Link to="/collections"> Collections</Link>
      <Link to="/reviews"> Reviews</Link>
      {token ? (<Link to="/account"> Account</Link>) : (<Link to="/login"> Login</Link>) }
    </div>
    <div id="main-section">
    <Routes>
     <Route path="/account" element={<Account token={token} setToken={setToken}/>} />
     <Route path="/albums" element={<Albums spotifyToken={spotifyToken} setSpotifyToken={setSpotifyToken}/>} />
     <Route path="/collections" element={<Collections token={token}/>} />
     <Route path="/reviews" element={<Reviews token={token}/>} />
     <Route path="/login" element={<Login token={token} setToken={setToken}/>} />
     <Route path="/register" element={<Register token={token} setToken={setToken}/>} />
     <Route path="/albums/:id" loader={({params }) => { return params.id }} element={<SingleAlbum  token={token} setToken={setToken} spotifyToken={spotifyToken}/>} />
     <Route path="/collections/:id" loader={({params }) => { return params.id }} element={<SingleCollection  token={token} setToken={setToken} spotifyToken={spotifyToken}/>} />
     <Route path="/" element={<Home/>} />
   </Routes>
    </div>
  </div>
  )
}