import { useState } from 'react';
import Navigations from './components/Navigations';
import { useNavigate } from 'react-router-dom';
import { fetchAlbums, fetchSpotifyToken } from './fetching';

function App() {
  const [token, setToken] = useState("")
  const [spotifyToken, setSpotifyToken] = useState("");
  const nav = useNavigate();
  const queryClient = new QueryClient()

  return (
      <div>
        <h1 className="name"><a href="/"><img className='logo-image' src={"https://pngimg.com/uploads/vinyl/vinyl_PNG14.png"}/></a>Spins</h1>
        <Navigations token={token} setToken={setToken} setSpotifyToken={setSpotifyToken} spotifyToken={spotifyToken}/>
      </div>
    )
  }


export default App

