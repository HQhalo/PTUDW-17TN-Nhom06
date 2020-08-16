var express = require('express');
var router = express.Router();
var {homepage} = require('../controllers/index');

/* GET home page. */
router.get('/', homepage);

module.exports = router;
