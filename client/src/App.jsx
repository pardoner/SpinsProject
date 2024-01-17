import { useState } from 'react'
import Navigations from '/components/Navigations'
import { fetchAlbums } from '../fetching'

function App() {
  const [token, setToken] = useState("")

  return (
      <div>
        <h1><img className='logo-image' src={"https://pngimg.com/uploads/vinyl/vinyl_PNG14.png"}/>Spins</h1>

        <p>Welcome to Spins!</p>
        <p>{console.log(fetchAlbums())}</p>
        <p>Spins is an album logging application. Create an account or login to explore albums.</p>
        <Navigations token={token} setToken={setToken}/>
      </div>
    )
  }

export default App

