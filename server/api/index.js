const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/collections', require('./collections'));

router.use('/albums', require('./albums'));

router.use('/reviews', require('./reviews'));

router.use('/users', require('./users'));


module.exports = router;
