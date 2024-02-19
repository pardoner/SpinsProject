const BASE_URL = `http://localhost:8080/api`;
const SPOTIFY_URL = `https://api.spotify.com/v1`;
const SPOTIFY_TOKEN_URL = `https://accounts.spotify.com/api`;


export const fetchSpotifyToken = async () => {
    try {
        var details = {
            'grant_type': 'client_credentials',
            'client_id': 'c65de028bb534b2498e40760da58902e',
            'client_secret': '857af09fbdeb4aeabb2dc2cea8d27634'
        };
        
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const response = await fetch(`${SPOTIFY_TOKEN_URL}/token`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(details)
        })
        console.log(new URLSearchParams(details).toString())

        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

export const fetchSpotifyAlbumArt = async (title, artist, spotifyToken) => {
    let search_response = []
    var queryBody = `?q=album%3A${encodeURIComponent(title)}%20artist%3A${encodeURIComponent(artist)}&type=album`

    try {
        const response = await fetch(`${SPOTIFY_URL}/search` + queryBody,
        {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${spotifyToken}`
            }
        },
        ) 
        search_response = await response.json();
        if (search_response.error) {
            return search_response
        }
    } catch (err) {
        console.error(err);
    }
    if (search_response) {
        const album = search_response.albums.items[0]
        if (album) {
            return album.images[0].url
        } 
    } else {
        return null
    }
}