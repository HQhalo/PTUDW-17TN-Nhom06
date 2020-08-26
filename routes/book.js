var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth');
const {viewBook} = require('../controllers/book');

/* GET users listing. */
// router.use(authMiddleware.hasRole('USER'))

router.get('/:bookId', viewBook);

module.exports = router;
