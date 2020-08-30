var express = require('express');
var router = express.Router();
var student = require('../../controllers/student');
const {populateHeader} = require('../../utils/data');
const authMiddleware = require('../../middlewares/auth');

//router.use(authMiddleware.hasRole('USER'));

router.get('/info', student.showInfo);
router.post('/info', student.updateInfo);

router.get('/changePassword', function(req,res,next) {
    res.render('studentChangePassword', {layout: "layout" , ...populateHeader(req.user)});
});
router.post('/changePassword', student.changePassword);

//router.get('/borrowRequest', student.showBookDescRequest);
router.get('/borrowRequest', student.showBookDescRequest);

router.get('/borrow', student.showHistoryBorrowBook);
module.exports = router;
