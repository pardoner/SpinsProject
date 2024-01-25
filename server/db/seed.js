const client = require('./client');
// TODO: DUMMY DATA

const { createAlbum, getAllAlbums } = require('./sqlHelperFunctions/albums')
const { createCollection, getAllCollections } = require('./sqlHelperFunctions/collections')
const { createReview, getAllReviews } = require('./sqlHelperFunctions/reviews')
const { createUser, getAllUsers } = require('./sqlHelperFunctions/users')
const { createCollectionEntry } = require('./sqlHelperFunctions/collection_entries')

const { collections, reviews, users, collection_entries } = require('./seedData')
const albums = require('./albums.json')

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());

  // drop tables for video games and board games
  async function dropTables() {
      try {
          console.log('Dropping All Tables...');
          await client.query(`
        DROP TABLE IF EXISTS collection_entries;
        DROP TABLE IF EXISTS collections;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS albums;
      `);
      } catch (error) {
          throw error;
      }
  }
  
  // build tables for video games and board games
  async function createTables() {
      try {
          console.log('Building All Tables...');
          await client.query(`
        CREATE TABLE albums (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          artist VARCHAR(255) NOT NULL,
          release_date TEXT,
          description TEXT,
          "imgUrl" VARCHAR(255) DEFAULT 'https://st4.depositphotos.com/11065358/29775/v/450/depositphotos_297757886-stock-illustration-vinyl-plate-disc-isolated-on.jpg'
          );
          CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(200),
            last_name VARCHAR(200),
            email VARCHAR(200),
            password VARCHAR(50),
            username VARCHAR(30)
          );
          CREATE TABLE collections (
              id SERIAL PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              "userId" INT REFERENCES users(id) NOT NULL
          );
          CREATE TABLE collection_entries (
            id SERIAL PRIMARY KEY,
            collection_id INT REFERENCES collections(id) NOT NULL,
            album_id INT REFERENCES albums(id) NOT NULL
          );
          CREATE TABLE reviews (
              id SERIAL PRIMARY KEY,
              body TEXT,
              date DATE,
              tags TEXT,
              rating INT,
              "userId" INT REFERENCES users(id) NOT NULL,
              "albumId" INT REFERENCES albums(id)
              );
          `);
      } catch (error) {
          throw error;
      }
  }

  const createInitialAlbums = async () => {
    try {
        //Looping through the "trainers" array from seedData
        for (const album of albums) {
            await createAlbum(album)
        }
        console.log("created albums")
    } catch (error) {
        throw error
    }
}

const createInitialCollections = async () => {
    try {
        for (const collection of collections) {
            await createCollection(collection)
        }
        console.log("created collections")
    } catch (error) {
        throw error
    }
}

const createInitialCollectionEntries = async () => {
    try {
        for (const entry of collection_entries) {
            await createCollectionEntry(entry)
        }
        console.log("created collection entry")
    } catch (error) {
        throw error
    }
}

const createInitialReviews = async () => {
    try {
        //Looping through the "trainers" array from seedData
        for (const review of reviews) {
            await createReview(review)
        }
        console.log("created reviews")
    } catch (error) {
        throw error
    }
}

const createInitialUsers = async () => {
    try {
        //Looping through the "trainers" array from seedData
        for (const user of users) {
            await createUser(user)
        }
        console.log("created users")
    } catch (error) {
        throw error
    }
}

  
  // build all tables and create initial data
  async function rebuildDB() {
      try {
          client.connect();
          await dropTables();
          await createTables();
          await createInitialAlbums();
          await createInitialUsers();
          await createInitialCollections();
          await createInitialReviews();
          await createInitialCollectionEntries();

        } catch (error) {
            console.error(error)
        } finally {
            client.end()
        }
  }