const { populateHeader } = require('../utils/data');
var userRepo = require('../repositories/user');
var borrowReqRepo = require('../repositories/borrowRequest');
var passwordUtil = require('../utils/password');
var bookRepo = require('../repositories/book');

const showInfo = function (req, res, next) {
    res.render("studentInfo", {
        layout: "layout", ...populateHeader(req.user),
        info: {
            name: req.user.name,
            id: req.user.userId,
            phone: req.user.phone,
            email: req.user.email
        },
    });
}

const updateInfo = function (req, res, next) {
    req.user.email = req.body.email;
    req.user.phone = req.body.phone;
    userRepo.updateInfo(req.body.id, req.body.email, req.body.phone, function (error, results, fields) {
        if (error) {
            console.log("[USER] can't update info user");
            console.log(error);
        }
        else {
            console.log("[USER] update user info success");
        }
    });
    res.redirect("/user/student/info");
}


const changePassword = function (req, res, next) {
    userRepo.findById(req.user.userId, function (error, results, fields) {
        if (error) {
            console("[USER] Change password");
            console.log(error);
        }
        if (results.lenght !== 0) {
            if (passwordUtil.checkPassword(req.body.oldP, results[0].password)) {

                if (req.body.confirmP === req.body.newP) {
                    var newP = passwordUtil.hashPassword(req.body.newP);
                    userRepo.updatePassword(req.user.userId, newP, function (error, results, fields) {
                        if (error) {
                            console.log("[USER] can't change password");
                            console.log(error);
                        }
                        else {
                            console.log("[USER] change password success");
                        }
                    });
                }
                else {
                    console.log("[USER] confirm password incorrect");
                }
            }
            else {
                console.log("[USER] password incorrect");
            }
        }
    });
    res.redirect("/user/student/changePassword");
}

const showBookDescRequest = function (req, res, next) {
    var user = req.user;
    borrowReqRepo.findBookBorrowRequestByUserId(user.userId, (error, listbook, fields) => {
        if (error) {
            console.log("[USER] can't show book request");
        }
        res.render("studentBorrowRequest", {
            layout: "layout", ...populateHeader(user),
            books: listbook
        });
    });
}

const showHistoryBorrowBook = function(req,res,next) {
    var user = req.user;
    borrowReqRepo.findHistoryBorrowBookByUserId(user.userId, (error, listbook, fields) => {
        if (error) {
            console.log("[USER] can't show history borrow book");
        }
        res.render("studentBorrowed", {
            layout: "layout", ...populateHeader(user),
            books: listbook
        });
    });
}

const showComment = function(req,res,next){

    userRepo.getComment(req.user.userId,function(error,listbook,fields){
        if (error){
            console.log("[USER] can't show Comment");
        }
        res.render("studentComment",{
            layout: "layout", ...populateHeader(req.user),
            books: listbook
        });
    });
    
}

module.exports = {
    showInfo,
    updateInfo,
    changePassword,
    showBookDescRequest,
    showHistoryBorrowBook,
    showComment
}