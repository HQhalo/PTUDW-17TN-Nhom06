var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', authController.login, authController.loginSuccessHanlder);
router.get('/logout', authController.logout);

module.exports = router;
