var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');
var {checkNotAuthenticated} = require('../middlewares/auth');

/* GET users listing. */
router.get('/login', checkNotAuthenticated, authController.loginPage);

router.post('/login', authController.login, authController.loginSuccessHanlder);
router.get('/logout', authController.logout);

module.exports = router;
