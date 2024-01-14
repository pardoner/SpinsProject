const express = require('express');
const router = express.Router();
const { authRequired } = require('./util');
const { getAllJournals, getJournalById,createJournal, updateJournal, deleteJournal } = require('../db/sqlHelperFunctions/journals');


router.get('/', async (req, res, next) => {
    try {
        const journal = await getAllJournals();
        res.send(journal);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const journal = await getJournalById(req.params.id);
        res.send(journal);
    } catch (error) {
        next(error);
    }
});


router.post('/', authRequired, async (req, res, next) => {
    try {
        const journal = await createJournal(req.body);
        res.send(journal);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const journal = await updateJournal(req.params.id, req.body);
        res.send(journal);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const journal = await deleteJournal(req.params.id);
        res.send(journal);
    } catch (err) {
        next(err);
    }
});

module.exports = router;