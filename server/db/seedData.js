const client = require('./client');
const csv = require('csv-parse');
const fs = require('fs') 

const data = []
const path = require("path");
const { isNull } = require('util');



const collections = [
{name: "Rock", userId: 1},
{name: "Hip-Hop", userId: 2},
{name:"Folk", userId: 3}
]
const collection_entries = [
    {collection_id: 1, album_id: 3},
    {collection_id: 2, album_id: 1},
    {collection_id: 3, album_id: 2}
]
const reviews = [
    { body: 'This is good', date: "01-10-2024", tags: "Rock", userId: 1, albumId: 3, rating: 10},
    { body: 'This is good', date: "01-10-2024", tags: "Hip-Hop", userId: 2, albumId: 1, rating: 10},
    { body: 'This is good', date: "01-10-2024", tags: "Folk", userId: 3, albumId: 2, rating: 10},
]

const users = [
    {first_name: "Dylan", last_name: "Wicker", email: "dylanwicker27@gmail.com", password: "ganondorf", username: "musicluvr"},
    {first_name: "Austin", last_name: "Stinkavich", email: "austin@email.com", password: "mabelmoo", username: "musiclukewarm"},
    {first_name: "Ganondorf", last_name: "Wickavich", email: "ganon@email.com", password: "iamacat", username: "musickitty"}
]

module.exports = { collections, reviews, users, collection_entries }