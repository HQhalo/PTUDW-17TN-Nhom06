var express = require('express');
var router = express.Router();
const { populateHeader } = require('../../utils/data');
const authMiddleware = require('../../middlewares/auth');
const libController = require('../../controllers/librarianController');
const upload = require("../../uploadImage");

router.use(authMiddleware.hasRole('LIBRARIAN'));

router.get('/thuthu',libController.searchUser );
 
router.post('/thuthuadd',libController.addAccount);
router.get('/thuthuadd', function (req, res, next) {
    res.render("librarianAddAccount", { layout: "layout", ...populateHeader(req.user) });
});

router.post('/thuthumuon', libController.saveBorrowBooks);
router.get('/thuthumuon', libController.borrowBooks);

router.get('/themsach', libController.addBook);
router.post('/themsach', libController.saveBook);
// router.get('/yeucaumua', function (req, res, next) {
//     res.render("librarianBuy", { layout: "layout", ...populateHeader(req.user) });
// });

router.get("/trasach", libController.giveBackBook);
router.post("/trasach",libController.saveGiveBackBook)

router.post("/uploadImage", upload.single('cover'), libController.uploadImage )
module.exports = router;