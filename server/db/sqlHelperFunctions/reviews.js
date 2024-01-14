
const client = require('../client');
const util = require('util');

// GET 
async function getAllReviews() {
    try {
      const { rows } = await client.query(`
                  SELECT * FROM reviews;
              `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

// GET - /api/albums/:albumId - get album by id
async function getReviewById(reviewId) {
    try {
        const { rows: [review] } = await client.query(`
      SELECT * FROM reviews
      WHERE id=$1;
    `, [reviewId]);
        return review;
    } catch (error) {
        throw error;
    }
}

// POST -
async function createReview(body) {
    try {
        const { rows: [review] } = await client.query(`
        INSERT INTO reviews(body, date, tags, rating, "userId", "albumId")
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `, [body.body, body.date, body.tags, body.rating, body.userId, body.albumId]);
        return review;
    } catch (error) {
        throw error;
    }
}

async function updateReview(reviewId, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [review] } = await client.query(`
      UPDATE reviews
      SET ${setString}
      WHERE id=${reviewId}
      RETURNING *;
    `, Object.values(fields));

        return review;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/albums/:album_id - delete an album
async function deleteReview(reviewId) {
    try {
        const { rows: [review] } = await client.query(`
      DELETE FROM reviews
      WHERE id=$1
      RETURNING *;
    `, [reviewId]);
        return review;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};