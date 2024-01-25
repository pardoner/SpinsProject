const express = require('express');
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// ROUTER: /api/collections
router.use('/collections', require('./collections'));

// ROUTER: /api/albums
router.use('/albums', require('./albums'));
// ROUTER: /api/journals

// ROUTER: /api/reviews
router.use('/reviews', require('./reviews'));

// ROUTER: /api/users
router.use('/users', require('./users'));


module.exports = router;
