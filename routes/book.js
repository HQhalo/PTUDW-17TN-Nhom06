var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:bookId', function(req, res, next) {
    res.render('book', { username: 'Huấn Hoa Hồng' });
});

module.exports = router;
