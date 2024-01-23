const express = require('express');
const router = express.Router();
const { authRequired } = require('./util');
const { getAllCollections, getCollectionById, createCollection, updateCollections, deleteCollections, getCollectionAlbums } = require('../db/sqlHelperFunctions/collections');

// GET - /api/collections - get all collections
router.get('/', async (req, res, next) => {
    try {
        const collections = await getAllCollections();
        res.send(collections);
    } catch (error) {
        next(error);
    }
});

router.get('/:id/albums', async (req, res, next) => {
    try {
        const collections = await getCollectionAlbums(req.params.id);
        res.send(collections);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const collections = await getCollectionById(req.params.id);
        res.send(collections);
    } catch (error) {
        next(error);
    }
});


// router.get('/:id', async (req, res, next) => {
//     try {
//         const collection = await getCollectionById(req.params.id);
//         res.send(collection);
//     } catch (error) {
//         next(error);
//     }
// });


router.post('/', authRequired, async (req, res, next) => {
    try {
        const collection = await createCollection(req.body);
        res.send(collection);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const collection = await updateCollections(req.params.id, req.body);
        res.send(collection);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const collection = await deleteCollections(req.params.id);
        res.send(collection);
    } catch (err) {
        next(err);
    }
});

module.exports = router;