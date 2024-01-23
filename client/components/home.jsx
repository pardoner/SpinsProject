import { useState } from 'react'
import Navigations from '/components/Navigations'
import { fetchAlbums } from '../fetching'

function App() {
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11c2ljbHV2ciIsImlhdCI6MTcwNTYyNzg3N30.-FvqmSYe13hgCwJ7d4uTdhczvKAQF_RfH_YLH0wz44M")

  return (
      <div>
        <p>Welcome to Spins!</p>
        <p>Spins is an album logging application. Create an account or login to explore albums.</p>
      </div>
    )
  }

export default App