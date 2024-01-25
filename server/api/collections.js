const express = require('express');
const router = express.Router();
const { authRequired, getUserFromRequest } = require('./util');
const { getAllCollections, getCollectionById, createCollection, updateCollections, deleteCollections, getCollectionAlbums } = require('../db/sqlHelperFunctions/collections');
const { createCollectionEntry } = require('../db/sqlHelperFunctions/collection_entries');

router.get('/', async (req, res, next) => {
    try {
        const user = await getUserFromRequest(req)
        const collections = await getAllCollections(user.id);
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
        const collection = await getCollectionById(req.params.id);
        res.send(collection);
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
        const user = await getUserFromRequest(req)
        let coll_id = req.body.collection_id
        let collection = null
        console.log(req.body)
        if (!req.body.collection_id){
            collection = await createCollection({name: req.body.name, userId: user.id});
            coll_id = collection.id;
        }
        if (req.body.album_id) {
            const collection_entry = await createCollectionEntry({collection_id: coll_id, album_id: req.body.album_id})
            console.log(`Logging coll entry: ${collection_entry}`)
            collection = await getCollectionById(coll_id);

        }
        console.log(JSON.stringify(collection))
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