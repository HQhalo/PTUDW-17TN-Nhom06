var express = require('express');
var router = express.Router();
const { populateHeader } = require('../utils/data');
const authMiddleware = require('../middlewares/auth');

/* GET users listing. */
router.use(authMiddleware.hasRole('USER'))

router.get('/:bookId', function(req, res, next) {
    res.render('book', {...populateHeader(req.user)});
});

module.exports = router;
