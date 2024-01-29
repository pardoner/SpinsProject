import { useState } from 'react';
import Navigations from './components/Navigations';
import { useNavigate } from 'react-router-dom';
import { fetchAlbums, fetchSpotifyToken } from './fetching';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';


function App() {
  // const [token, setToken] = useState("")
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11c2ljbHV2ciIsImlhdCI6MTcwNTYyNzg3N30.-FvqmSYe13hgCwJ7d4uTdhczvKAQF_RfH_YLH0wz44M")
  const [spotifyToken, setSpotifyToken] = useState("");
  const nav = useNavigate();
  const queryClient = new QueryClient()

  return (
      <div>
        <h1 className="name"><a href="/"><img className='logo-image' src={"https://pngimg.com/uploads/vinyl/vinyl_PNG14.png"}/></a>Spins</h1>
        <Navigations token={token} setToken={setToken} setSpotifyToken={setSpotifyToken} spotifyToken={spotifyToken}/>
        <QueryClientProvider client={queryClient}>
        </QueryClientProvider>
      </div>
    )
  }


export default App

