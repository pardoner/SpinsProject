const express = require('express');
const router = express.Router();
const { authRequired } = require('./util');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../db/sqlHelperFunctions/users');

router.get('/', async (req, res, next) => {
    try {
        const user = await getAllUsers();
        res.send(user);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id);
        res.send(user);
    } catch (error) {
        next(error);
    }
});


router.post('/', authRequired, async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        res.send(user);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        res.send(user);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const user = await deleteUser(req.params.id);
        res.send(user);
    } catch (err) {
        next(err);
    }
});

module.exports = router;