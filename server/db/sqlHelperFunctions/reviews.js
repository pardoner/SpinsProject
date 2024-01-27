
const client = require('../client');
const util = require('util');

async function getAllReviews(userId) {
    try {
      const { rows } = await client.query(`
                  SELECT * FROM reviews
                  WHERE reviews."userId" = $1;
              `, [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

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


async function createReview(body) {
    try {
        console.log(body.tags)
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
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

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