var express = require('express');
var router = express.Router();
const { populateHeader } = require('../../utils/data');
const authMiddleware = require('../../middlewares/auth');

router.use(authMiddleware.hasRole('USER'));

module.exports = router;
