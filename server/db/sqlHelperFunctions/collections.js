
const client = require('../client');
const util = require('util');

// GET 
async function getAllCollections() {
    try {
      const { rows } = await client.query(`
                  SELECT * FROM collections;
              `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

// GET - /api/albums/:albumId - get album by id
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
      WHERE id IN (SELECT "albumId" from collections where id = $1);
    `, [collectionId]);
        return rows;
    } catch (error) {
        throw error;
    }
}

// POST -
async function createCollection(body) {
    try {
        const { rows: [collection] } = await client.query(`
        INSERT INTO collections(name, "userId", "albumId", "imgUrl")
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `, [body.name, body.userId, body.albumId, body.imgUrl]);
        return collection;
    } catch (error) {
        throw error;
    }
}

async function updateCollection(collectionId, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

    // return early if this is called without fields
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

// DELETE - /api/albums/:album_id - delete an album
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

module.exports = {
    getAllCollections,
    getCollectionById,
    createCollection,
    updateCollection,
    deleteCollection,
    getCollectionAlbums
};
