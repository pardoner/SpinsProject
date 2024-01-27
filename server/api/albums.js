const express = require('express');
const router = express.Router();
const { authRequired } = require('./util');
const { getAllAlbums, getAlbumById, createAlbum } = require('../db/sqlHelperFunctions/albums');

router.get('/', async (req, res, next) => {
    try {
        const albums = await getAllAlbums();
        res.send(albums);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const album = await getAlbumById(req.params.id);
        res.send(album);
    } catch (error) {
        next(error);
    }
});


router.post('/', authRequired, async (req, res, next) => {
    try {
        const album = await createAlbum(req.body);
        res.send(album);
    } catch (err) {
        next(err);
    }
});

module.exports = router;