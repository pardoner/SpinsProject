
const client = require('../client');
const util = require('util');
const { users } = require('../seedData');

// GET 
async function getAllUsers() {
    try {
      const { rows } = await client.query(`
                  SELECT * FROM users;
              `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

// GET - 
async function getUserById(id) {
    try {
        const { rows: [user] } = await client.query(`
      SELECT * FROM users
      WHERE id=$1;
    `, [id]);
        return user;
    } catch (error) {
        throw error;
    }
}

// POST -
async function createUser(body) {
    try {
        const { rows: [user] } = await client.query(`
        INSERT INTO users(first_name, last_name, email, password, username)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
        `, [body.first_name, body.last_name, body.email, body.password, body.username]);
        return user;
    } catch (error) {
        throw error;
    }
}

async function updateUser(id, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [user] } = await client.query(`
      UPDATE reviews
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `, Object.values(fields));

        return user;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/albums/:album_id - delete an album
async function deleteUser(id) {
    try {
        const { rows: [user] } = await client.query(`
      DELETE FROM users
      WHERE id=$1
      RETURNING *;
    `, [id]);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};