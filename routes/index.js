var express = require('express');
var router = express.Router();
const { populateHeader } = require('../utils/data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {...populateHeader(req.user)});
});

module.exports = router;
