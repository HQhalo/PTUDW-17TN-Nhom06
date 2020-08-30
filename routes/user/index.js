var express = require('express');
var router = express.Router();
const authMiddleware = require('../../middlewares/auth');

const studentRouter = require('./student');
const librarianRouter = require('./librarian');
const professorRouter = require('./professor');

router.use('/student', studentRouter);
router.use('/librarian', librarianRouter);
router.use('/professor', professorRouter);


router.use(authMiddleware.hasRole('USER'));


module.exports = router;
