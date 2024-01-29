import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetMeQuery } from '../src/api/spinsapi'; 
import Userfront from "@userfront/core";
import { ReactDOM } from "react";
import { useNavigate } from 'react-router-dom';

export default function Account ({token, setToken}) {
  const nav = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data, error, isLoading } = useGetMeQuery(token);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
     }, 1000);
        return () => clearInterval(intervalId);
    }, []) 

  if (isLoading) {
    return <div><img className="loading" src="https://www.jimphicdesigns.com/downloads/imgs-mockup/pixelated-hourglass-loading.gif"/></div>;
  }

  if (error) {
    console.log(error)
    return <div>Error: {error.data}</div>;
    
  }
  const handleClick = () => {
    console.log("logging out")
    setToken(null)
    nav("/")
  } 

  const user = data
  console.log(data)

    return (
    <div className="account">
      <h1>Account</h1>
        <p>Hi, {user.first_name} {user.last_name}!</p> 
        <p>{user.email}</p>
        <p>{currentDate.toLocaleString()}</p>
        <>
            <p>Done for the day?</p>
            { token ? (<button id="logout-button" onClick={handleClick}>
              Log out
            </button>) : null }
        </>
    </div>
  );
}
