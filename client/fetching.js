const BASE_URL = `http://localhost:8080/api`;

export const registerUser = async (username, password) => {
    try {
        const response = await fetch(
            `${BASE_URL}/users/register`, {
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

export const fetchReviews = async () => {
    try {
        const response = await fetch(`${BASE_URL}/reviews`)
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

export const fetchJournals = async () => {
    try {
        const response = await fetch(`${BASE_URL}/journals`)
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}

export const makeJournal = async (journals, token) => {
    try {
        console.log(token, "hello this is the token")
        const response = await fetch(`${BASE_URL}/journals`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                body: journals.body,
                date: journals.date,
                userId: journals.userId,
                albumId: journals.albumID,
                frequency: journals.frequency
            })
        });
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}