const client = require('./client');


const albums = [
    { title: 'Doggystyle', artist: 'Snoop Dogg', genre: "Hip-Hop", release_date: "11-23-93", description: "Doggystyle is the debut studio album by American rapper Snoop Dogg It was released on November 23, 1993, by Death Row Records and Interscope Records.", tracklist: ["Bathtub", "G Funk Intro", "Gin and Juice", "W Balls", "Tha Shiznit", "Domino Intro", "Lodi Dodi", "Murder Was the Case", "Serial Killa", "Who Am I? (What's My Name?"], imgUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/SnoopDoggyDoggDoggystyle.jpg/220px-SnoopDoggyDoggDoggystyle.jpg"},
    { title: 'Blood on the Tracks', artist: "Bob Dylan", genre: "Folk", release_date: "01-20-1975", description: "Blood on the Tracks is the fifteenth studio album by American singer-songwriter Bob Dylan, released on January 20, 1975, by Columbia Records.", tracklist: ["Tangled Up in Blue", "Simple Twist of Fate", "You're a Big Girl Now", "Idiot Wind", "You're Gonna Make Me Lonesome When You Go", "Meet Me in the Morning", "Lily, Rosemary and the Jack of Hearts", "If You See Her, Say Hello", "Shelter From the Storm", "Buckets of Rain"], imgUrl: "https://upload.wikimedia.org/wikipedia/en/f/fa/Bob_Dylan_-_Blood_on_the_Tracks.jpg" },
    { title: 'Tidal', artist: "Fiona Apple", genre: "Rock", release_date: "07-23-1996", description: "Tidal is the debut studio album by American singer-songwriter Fiona Apple, released on July 23, 1996, by The WORK Group. Tidal produced three singles: 'Shadowboxer', 'Sleep to Dream', and 'Criminal'. The latter was the album's most popular single, winning a Grammy Award for Best Female Rock Vocal Performance in 1998.", tracklist: ["Sleep to Dream", "Sullen Girl", "Shadowboxer", "Criminal", "Slow Like Honey", "The First Taste", "Never Is A Promise", "The Child Is Gone", "Pale September", "Carrion"], imgUrl: "https://upload.wikimedia.org/wikipedia/en/b/b5/FionaAppleTidal.png" },
]

const collections = [
{name: "Rock", userId: 1, albumId: 3},
{name: "Hip-Hop", userId: 2, albumId: 1},
{name:"Folk", userId: 3, albumId: 2}
]

const reviews = [
    { body: 'This is good', date: "01-10-2024", tags: "Rock", userId: 1, albumId: 1, rating: 10},
    { body: 'This is good', date: "01-10-2024", tags: "Hip-Hop", userId: 2, albumId: 2, rating: 10},
    { body: 'This is good', date: "01-10-2024", tags: "Folk", userId: 3, albumId: 3, rating: 10},
]

const journals = [
    { body: 'Listening to Tek It', date: "01-10-2024", userId: 1, albumId: 1, frequency: "Medium"},
    { body: 'Listening to Paradise Garage', date: "01-09-2024", userId: 2, albumId: 1, frequency: "Light"},
    { body: 'Listening to Water', date: "01-08-2024", userId: 3, albumId: 1, frequency: "Heavy"},
]

const users = [
    {first_name: "Dylan", last_name: "Wicker", email: "dylanwicker27@gmail.com", password: "ganondorf", username: "musicluvr"},
    {first_name: "Austin", last_name: "Stinkavich", email: "austin@email.com", password: "mabelmoo", username: "musiclukewarm"},
    {first_name: "Ganondorf", last_name: "Wickavich", email: "ganon@email.com", password: "iamacat", username: "musickitty"}
]

module.exports = { albums, collections, reviews, journals, users }