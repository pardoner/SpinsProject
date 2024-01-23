
const client = require('../client');
const util = require('util');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../secrets')

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

async function getUserByUsername(username) {
    console.log(username)
    try {
        const { rows: [user] } = await client.query(`
        SELECT * FROM users
        WHERE users.username=$1
        `, [username]);
        return user;
    } catch (error) {
        throw error;
    }
}
// POST -
async function createUser(body) {
    try {
        const { rows: [user] } = await client.query(`
        INSERT INTO users(first_name, last_name, email, username, password)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
        `, [body.first_name, body.last_name, body.email, body.username, body.password]);
        const token = jwt.sign({username: body.username}, JWT_SECRET);
        return token; // return user?
    } catch (error) {
        throw error;
    }
}

// body = {"username" : "XXXX", "password": "wwww"}
async function postLogin(body) {
    try {
        const { rows : [user] } = await client.query(`
        SELECT * FROM users
        WHERE users.username = $1
        `, [body.username]
        )
        if (!user) {
            user(404).send("Not found."); // or res.status 404? 
        } else if (user.password != body.password) {
            user(403).send("Unauthorized.");
        }
        const token = jwt.sign({username: body.username}, JWT_SECRET);

	
        return token
    } catch (error) {
        throw error;
    }
}

// create token 
// throw http errors
// in util uncomment token verify 

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
    deleteUser,
    postLogin,
    getUserByUsername
};