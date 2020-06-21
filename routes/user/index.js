var express = require('express');
var router = express.Router();
const { populateHeader } = require('../../utils/data');
const authMiddleware = require('../../middlewares/auth');

const studentRouter = require('./student');
const librarianRouter = require('./librarian');
const professorRouter = require('./professor');

router.use('/student', studentRouter);
router.use('/librarian', librarianRouter);
router.use('/professor', professorRouter);

router.use(authMiddleware.hasRole('USER'));
router.get('/info', function (req, res, next) {
  res.render("info", { layout: "layout", ...populateHeader(req.user) });
});

module.exports = router;
