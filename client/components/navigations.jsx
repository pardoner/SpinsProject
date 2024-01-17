/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
// import './index.css'
// import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import Albums from './albums';
// import Collections from "./collections";
// import Journal from "./journal";
import Register from './Register';
// import Reviews from './reviews';
import Login from './login';

export default function Navigations({token, setToken}) {

  return (
    <div id="container">
    <div id="navbar">
      <Link to="/albums">Albums</Link> | 
      <Link to="/collections"> Collections</Link> |  
      <Link to="/reviews"> Reviews</Link> | 
      <Link to="/journal"> Journal</Link> |
      <Link to="/login"> Login</Link>
    </div>
    <div id="main-section">
    <Routes>
     {/* <Route path="/account" element={<Account token={token} setToken={setToken} />} /> */}
     <Route path="/albums" element={<Albums/>} />
     {<Route path="/collections" element={<Collections/>} />}
     {<Route path="/reviews" element={<Reviews/>} />}
     {<Route path="/journal" element={<Journal/>} />}
     <Route path="/login" element={<Login token={token} setToken={setToken}/>} />
     <Route path="/register" element={<Register token={token} setToken={setToken}/>} />
     {<Route path="/albums/:id" loader={({params }) => { return params.id }} element={<SingleAlbum  token={token} setToken={setToken}/>} />}
     {<Route path="/collections/:id" loader={({params }) => { return params.id }} element={<SingleCollection  token={token} setToken={setToken}/>} />}
   </Routes>
    </div>
  </div>
  )
}