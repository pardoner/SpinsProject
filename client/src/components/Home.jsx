import { useState } from 'react'
import Navigations from './Navigations';
import { fetchAlbums } from '../fetching'

function App() {
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11c2ljbHV2ciIsImlhdCI6MTcwNTYyNzg3N30.-FvqmSYe13hgCwJ7d4uTdhczvKAQF_RfH_YLH0wz44M")

  return (
      <div className = "intro">
        <p>Welcome to Spins!</p>
        <p>Spins is an album logging application. Create an account or login to review and collect the records you've been spinning!</p>
        <p>On the albums page, you'll be able to search through the Rolling Stone's Top 500 Album selections. Press an album for more information. Log and organize a record collection virtually, or make a wishlist!</p>
        <img src="https://media1.giphy.com/media/LNOZoHMI16ydtQ8bGG/giphy.gif?cid=6c09b952z2kazvpuobgl9thdie60vxb4qb4g4ddy32abqzec&ep=v1_stickers_related&rid=giphy.gif&ct=s" alt="vinyl" />
      </div>
    )
  }

export default App
