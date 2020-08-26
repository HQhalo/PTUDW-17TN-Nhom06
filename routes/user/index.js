var express = require('express');
var router = express.Router();
const authMiddleware = require('../../middlewares/auth');

const studentRouter = require('./student');
const librarianRouter = require('./librarian');
const professorRouter = require('./professor');

router.use('/student', studentRouter);
router.use('/librarian', librarianRouter);
router.use('/professor', professorRouter);

var {infomation} = require('../../controllers/info');
router.use(authMiddleware.hasRole('USER'));
router.get('/info', infomation);

module.exports = router;
