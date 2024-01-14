
const client = require('../client');
const util = require('util');

// GET 
async function getAllJournals() {
    try {
      const { rows } = await client.query(`
                  SELECT * FROM journals;
              `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

// GET - /api/albums/:albumId - get album by id
async function getJournalById(journalId) {
    try {
        const { rows: [journal] } = await client.query(`
      SELECT * FROM journals
      WHERE id=$1;
    `, [journalId]);
        return journal;
    } catch (error) {
        throw error;
    }
}

// POST -
async function createJournal(body) {
    try {
        const { rows: [journal] } = await client.query(`
        INSERT INTO journals(body, frequency, date, "albumId", "userId")
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
        `, [body.body, body.frequency, body.date, body.albumId, body.userId]);
        return journal;
    } catch (error) {
        throw error;
    }
}

async function updateJournal(journalId, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [journal] } = await client.query(`
      UPDATE journals
      SET ${setString}
      WHERE id=${journalId}
      RETURNING *;
    `, Object.values(fields));

        return journal;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/albums/:album_id - delete an album
async function deleteJournal(journalId) {
    try {
        const { rows: [journal] } = await client.query(`
      DELETE FROM journals
      WHERE id=$1
      RETURNING *;
    `, [journalId]);
        return journal;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllJournals,
    getJournalById,
    createJournal,
    updateJournal,
    deleteJournal
};
