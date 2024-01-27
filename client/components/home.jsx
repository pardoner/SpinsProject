import { useState } from 'react'
import Navigations from '/components/Navigations'
import { fetchAlbums } from '../fetching'

function App() {
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11c2ljbHV2ciIsImlhdCI6MTcwNTYyNzg3N30.-FvqmSYe13hgCwJ7d4uTdhczvKAQF_RfH_YLH0wz44M")

  return (
      <div>
        <p>Welcome to Spins!</p>
        <p>Spins is an album logging application. Create an account or login to explore albums.</p>
        <p>On the albums page, you'll be able to search through albums from the Rolling Stones's Top 500 Albums selections. Press an album for more information.</p>
        <p>Log and organize a record collection virtually, or make a wishlist!</p>
        <p>Review albums and collect the albums you've been spinning!</p>
      </div>
    )
  }

export default App