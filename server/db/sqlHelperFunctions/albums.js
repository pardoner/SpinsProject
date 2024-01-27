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

async function createAlbum(body) {
    try {
        const { rows: [album] } = await client.query(`
        INSERT INTO albums(title, artist, release_date, description, "imgUrl")
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
        `, [body.title, body.artist, body.release_date, body.description, body.imgUrl]);
        return album;
    } catch (error) {
        throw error;
    }
}
async function createAlbumWithoutImage(body) {
    try {
        const { rows: [album] } = await client.query(`
        INSERT INTO albums(title, artist, release_date, description)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `, [body.title, body.artist, body.release_date, body.description]);
        return album;
    } catch (error) {
        throw error;
    }
}


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
    deleteAlbum,
    createAlbumWithoutImage
};


