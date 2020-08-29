var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth');
const {viewBook, borrowBook, commentBook} = require('../controllers/book');

/* GET users listing. */
router.use(authMiddleware.hasRole('USER'))

router.get('/:bookId', viewBook);
router.get('/borrow/:bookId', borrowBook);
router.post('/:bookId/comment', commentBook);

module.exports = router;
