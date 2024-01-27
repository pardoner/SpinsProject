
const client = require('../client');
const util = require('util');

async function getAllCollections(userId) {
    try {
      const { rows } = await client.query(`
                  SELECT * FROM collections
                  WHERE collections."userId" = $1;
              `, [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

async function getCollectionById(collectionId) {
    try {
        const { rows: [collection] } = await client.query(`
      SELECT * FROM collections
      WHERE id=$1;
    `, [collectionId]);
        return collection;
    } catch (error) {
        throw error;
    }
}

async function getCollectionAlbums(collectionId) {
    try {
        const { rows } = await client.query(`
      SELECT * FROM albums
      WHERE id IN (SELECT album_id from collection_entries
        WHERE collection_entries.collection_id = $1);
    `, [collectionId]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function createCollection({name, userId}) {
    console.log("making collection")
    try {
        const { rows: [collection] } = await client.query(`
        INSERT INTO collections(name, "userId")
        VALUES($1, $2)
        RETURNING *;
        `, [name, userId]);
        return collection;
    } catch (error) {
        throw error;
    }
}

async function updateCollection(collectionId, fields = {}) {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [collection] } = await client.query(`
      UPDATE collections
      SET ${setString}
      WHERE id=${collectionId}
      RETURNING *;
    `, Object.values(fields));

        return collection;
    } catch (error) {
        throw error;
    }
}

async function deleteCollection(collectionId) {
    try {
        const { rows: [collection] } = await client.query(`
      DELETE FROM collections
      WHERE id=$1
      RETURNING *;
    `, [collectionId]);
        return collection;
    } catch (error) {
        throw error;
    }
}

async function deleteCollectionAlbum(collectionId, albumId) {
    try {
        const { rows: [collection] } = await client.query(`
      DELETE FROM collection_entries
      WHERE collection_id=$1
      AND album_id = $2
      RETURNING *;
    `, [collectionId, albumId]);
        return collection;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllCollections,
    getCollectionById,
    createCollection,
    updateCollection,
    deleteCollection,
    getCollectionAlbums,
    deleteCollectionAlbum
};
