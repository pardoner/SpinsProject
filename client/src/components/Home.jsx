import { useState } from 'react'
import Navigations from './Navigations';

function App() {
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11c2ljbHV2ciIsImlhdCI6MTcwNTYyNzg3N30.-FvqmSYe13hgCwJ7d4uTdhczvKAQF_RfH_YLH0wz44M")

  return (
      <div className = "intro">
        <p>Spins is an album logging website. Create an account or login to review and collect the records you've been spinning. On the albums page, you'll be able to search through the Rolling Stone's Top 500 Album selections. Press an album for more information. Log and organize a record collection virtually, or make a wishlist!</p>
        <br></br>
        <br></br>
        <img src = "https://d39l2hkdp2esp1.cloudfront.net/img/photo/212573/212573_00_2x.jpg?20200706140730"></img>
        <br></br>
        <br></br>
      </div>
    )
  }

export default App
