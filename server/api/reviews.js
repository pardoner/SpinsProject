const express = require('express');
const router = express.Router();
const { authRequired, getUserFromRequest } = require('./util');
const {    getAllReviews, getReviewById, createReview, updateReview, deleteReview } = require('../db/sqlHelperFunctions/reviews');


router.get('/', async (req, res, next) => {
    try {
        const user = await getUserFromRequest(req)
        const review = await getAllReviews(user.id);
        res.send(review);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const review = await getReviewById(req.params.id);
        res.send(review);
    } catch (error) {
        next(error);
    }
});


router.post('/', authRequired, async (req, res, next) => {
    try {
        const user = await getUserFromRequest(req)
        let body = Object.create(req.body)
        body.userId = user.id
        const review = await createReview(body);
        res.send(review);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const review = await updateReview(req.params.id, req.body);
        res.send(review);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const review = await deleteReview(req.params.id);
        res.send(review);
    } catch (err) {
        next(err);
    }
});

module.exports = router;