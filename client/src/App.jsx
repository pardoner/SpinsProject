import { useState } from 'react'
import Navigations from '/components/Navigations'
import { fetchAlbums, fetchSpotifyToken } from '../fetching' //TODO implement fetch

function App() {
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11c2ljbHV2ciIsImlhdCI6MTcwNTYyNzg3N30.-FvqmSYe13hgCwJ7d4uTdhczvKAQF_RfH_YLH0wz44M")
  const [spotifyToken, setSpotifyToken] = useState("")

  grabSpotifyToken()
  
  return (
      <div>
        <h1><img className='logo-image' src={"https://pngimg.com/uploads/vinyl/vinyl_PNG14.png"}/>Spins</h1>
        <Navigations token={token} setToken={setToken}/>
      </div>
    )
  }

export default App

async function grabSpotifyToken() {
  setSpotifyToken(await fetchSpotifyToken())
}