const BASE_URL = `https://spins-project.onrender.com/api`;
const SPOTIFY_URL = `https://api.spotify.com/v1`;
const SPOTIFY_TOKEN_URL = `https://accounts.spotify.com/api`;
import Cookies from 'js-cookie';

const tryGetToken = (token) => {
    if (token) {
        return token
    }

    const cookie_token = Cookies.get("token")
    if (cookie_token) {
        return cookie_token
    } else {
        return null
    }
}
export const registerUser = async ({first_name, last_name, username, password, email}) => {
    try {
        const response = await fetch(
            `${BASE_URL}/users`, { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name,
                last_name,
                username,
                password,
                email
            })
        });
        const result = await response.json();
        console.log(result)
        Cookies.set("token", result.token)
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
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const result = await response.json();
        Cookies.set("token", result.token)
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
        const response = await fetch(`${BASE_URL}/collections`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tryGetToken(token)}`
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
        const response = await fetch(`${BASE_URL}/collections`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tryGetToken(token)}`
            },
            body: JSON.stringify({
                collection_id: collection_id,
                albumId: album_id
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

export const fetchCollectionAlbumsById = async (collectionId, token) => {
    try {
        const response = await fetch(`${BASE_URL}/collections/${collectionId}/albums`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tryGetToken(token)}`
            }
        })
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}
export const fetchCollectionById = async (collectionId, token) => {
    try {
        const response = await fetch(`${BASE_URL}/collections/${collectionId}`,
        {        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tryGetToken(token)}`
        }
        })
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

export const deleteCollectionAlbum = async (album_id, token, collection_id) => {
    try {
        const response = await fetch(`${BASE_URL}/collections/${collection_id}/${album_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tryGetToken(token)}`
            }
        });
        console.log(response)
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

export const deleteCollectionById = async (collectionId, token) => {
    try {
        const response = await fetch(`${BASE_URL}/collections/${collectionId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tryGetToken(token)}`
            }
        });
        console.log(response)
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
            'Authorization': `Bearer ${tryGetToken(token)}`
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
        const response = await fetch(`${BASE_URL}/reviews`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tryGetToken(token)}`
            },
            body: JSON.stringify({
                body: review.body,
                tags: review.tags,
                date: review.date,
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

export const deleteReview = async (review_id, token) => {
    try {
        const response = await fetch(`${BASE_URL}/reviews/${review_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tryGetToken(token)}`
            }
        });
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

export const editReview = async (review, token) => {
    try {
        const response = await fetch(`${BASE_URL}/reviews/${review.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tryGetToken(token)}`
            },
            body: JSON.stringify({
                albumId: review.albumId,
                body: review.body,
                tags: review.tags,
                date: review.date,
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