const client = require('../client');
const util = require('util');

async function getAllAlbums() {
    try {
      const { rows } = await client.query(`
                  SELECT * FROM albums;
              `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

async function getAlbumById(albumId) {
    try {
        const { rows: [album] } = await client.query(`
      SELECT * FROM albums
      WHERE id=$1;
    `, [albumId]);
        return album;
    } catch (error) {
        throw error;
    }
}

// POST -
async function createAlbum(body) {
    try {
        const { rows: [album] } = await client.query(`
        INSERT INTO albums(title, artist, genre, release_date, tracklist, description, "imgUrl")
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `, [body.title, body.artist, body.genre, body.release_date, body.tracklist, body.description, body.imgUrl]);
        return album;
    } catch (error) {
        throw error;
    }
}



// DELETE - /api/albums/:album_id - delete an album
async function deleteAlbum(albumId) {
    try {
        const { rows: [album] } = await client.query(`
      DELETE FROM albums
      WHERE id=$1
      RETURNING *;
    `, [albumId]);
        return album;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllAlbums,
    getAlbumById,
    createAlbum,
    deleteAlbum
};


