const BASE_URL = `http://localhost:8080/api`;
const SPOTIFY_URL = `https://api.spotify.com/v1`;
const SPOTIFY_TOKEN_URL = `https://accounts.spotify.com/api`;

export const registerUser = async (first_name, last_name, username, password) => {
    try {
        const response = await fetch(
            `${BASE_URL}/users`, { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'pinkerton'
            },
            body: JSON.stringify({
                first_name,
                last_name,
                username,
                password
            })
        });
        const result = await response.json();
        console.log(result)
        return result
    } catch (err) {
        console.error(err);
    }
}

export const login = async (username, password) => {

    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

export const fetchAlbums = async () => {
    try {
        const response = await fetch(`${BASE_URL}/albums`)
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}


export const fetchCollections = async () => {
    try {
        const response = await fetch(`${BASE_URL}/albums`)
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

export const makeCollection = async ({albumId, token, name}) => {
    try {
        console.log(token, "hello this is the token")
        const response = await fetch(`${BASE_URL}/collections`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                albumId: albumId
            })
        });
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

export const makeCollectionEntry = async ({album_id, token, collection_id}) => {
    try {
        console.log(token, "hello this is the token")
        const response = await fetch(`${BASE_URL}/collections`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                collection_id: collection_id,
                album_id: album_id
            })
        });
        console.log(response)
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

export const fetchCollectionAlbumsById = async (collectionId) => {
    try {
        const response = await fetch(`${BASE_URL}/collections/${collectionId}/albums`)
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}
export const fetchCollectionById = async (collectionId) => {
    try {
        const response = await fetch(`${BASE_URL}/collections/${collectionId}`)
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

export const fetchReviews = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/reviews`,
        { headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }})
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

export const makeReview = async (review, token) => {
    try {
        console.log(token, "hello this is the token")
        const response = await fetch(`${BASE_URL}/reviews`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                body: review.body,
                tags: review.tags,
                albumId: review.albumId,
                rating: review.rating
            })
        });
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

export const fetchAlbumById = async (albumId) => {
    try {
        const response = await fetch(`${BASE_URL}/albums/${albumId}`)
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

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
        ) // fetch("api.spotify.com/api/v1/search&q=artist:briteny%20spears,album:BLACKOUT&type=album")
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