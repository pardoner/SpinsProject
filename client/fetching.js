const BASE_URL = `http://localhost:8080/api`;
const SPOTIFY_BASE_URL = ``;

export const registerUser = async (first_name, last_name, username, password) => {
    try {
        const response = await fetch(
            `${BASE_URL}/users`, { // register?
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

// export const getUser = async (username, password) => {

//     try {
//         const response = await fetch(`${BASE_URL}/users/login`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 username,
//                 password
//             })
//         });
//         const result = await response.json();
//         console.log(result);
//         return result
//     } catch (err) {
//         console.error(err);
//     }
// }

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

export const makeCollection = async (collecion, token) => {
    try {
        console.log(token, "hello this is the token")
        const response = await fetch(`${BASE_URL}/collecions`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: collection.name,
                userId: collection.userId,
                albumID: collection.albumID
            })
        });
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
                date: review.date,
                tags: review.tags,
                userId: review.userId,
                albumId: review.albumID,
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
            'cleint_id': '',
            'client_secret': ''
        };
        
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const response = await fetch(`${SPOTIFY_BASE_URL}/token`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: formBody
        })

        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

export const fetchSpotifyAlbumArt = (title, artist) => {
 //TODO
 //call spotify /search endpoint with query paramter "q" = "artist:<artist>,album:<album>" and 
 // query parameter "type" = "album"
 // for examples look at thunder client
 /// return value will have ID for album
 // use id to make callt o spotify /album/:id endpoint
 // response will have a key called "images", look at any in the array, and take the key "url"
 // MAKE SURE BOTH CALLS USE authrization HEADER and token has "Bearer " before it
}