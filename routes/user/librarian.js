var express = require('express');
var router = express.Router();
const { populateHeader } = require('../../utils/data');
const authMiddleware = require('../../middlewares/auth');
const libController = require('../../controllers/librarianController')
// router.use(authMiddleware.hasRole('LIBRARIAN'));

router.get('/thuthu',libController.searchUser );
 
router.post('/thuthuadd',libController.addAccount);
router.get('/thuthuadd', function (req, res, next) {
    res.render("librarianAddAccount", { layout: "layout", ...populateHeader(req.user) });
});
router.get('/thuthumuon', libController.borrowBooks);
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