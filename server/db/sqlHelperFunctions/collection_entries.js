
const client = require('../client');
const util = require('util');

// POST -
async function createCollectionEntry({collection_id, album_id}) {
    try {
        const { rows: [entry] } = await client.query(`
        INSERT INTO collection_entries(collection_id, album_id)
        VALUES($1, $2)
        RETURNING *;
        `, [collection_id, album_id]);
        return entry;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/albums/:album_id - delete an album
async function deleteCollectionEntry(id) {
    try {
        const { rows: [collection] } = await client.query(`
      DELETE FROM collection_entries
      WHERE id=$1
      RETURNING *;
    `, [id]);
        return entry;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createCollectionEntry,
    deleteCollectionEntry
};
