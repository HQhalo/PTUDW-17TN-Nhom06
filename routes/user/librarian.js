var express = require('express');
var router = express.Router();
const { populateHeader } = require('../../utils/data');
const authMiddleware = require('../../middlewares/auth');

router.use(authMiddleware.hasRole('LIBRARIAN'));

router.get('/thuthu', function (req, res, next) {
    res.render("librarianSearch", { layout: "layout", ...populateHeader(req.user) });
});
router.get('/thuthuadd', function (req, res, next) {
    res.render("librarianAddAccount", { layout: "layout", ...populateHeader(req.user) });
});
router.get('/thuthumuon', function (req, res, next) {
    res.render("librarianBorrowing", { layout: "layout", ...populateHeader(req.user) });
});
router.get('/themsach', function (req, res, next) {
    res.render("librarianAddBooks", { layout: "layout", ...populateHeader(req.user) });
});
router.get('/yeucaumua', function (req, res, next) {
    res.render("librarianBuy", { layout: "layout", ...populateHeader(req.user) });
});
router.get("/trasach", function (req, res, next) {
    res.render("librarianGiveBack", { layout: "layout", ...populateHeader(req.user) });
});

module.exports = router;