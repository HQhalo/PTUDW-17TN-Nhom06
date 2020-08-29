var userRepo = require('../repositories/user');
var borrowRequestRepo = require('../repositories/borrowRequest');
var borrowRepo = require("../repositories/borrow");
var bookRepo = require("../repositories/book");
const { populateHeader } = require('../utils/data');
const password = require('../utils/password');
const roles = require('../constants/roles');
const borrow = require('../repositories/borrow');
const book = require('./book');
const user = require('../repositories/user');


const searchUser = (req, res, next) => {

    if (req.query.userid) {
        userRepo.findByNameOrUserId(req.query.userid, (error, results, fields) => {

            if (results.length !== 0) {
                let users = [];
                for(i =0;i< results.length;i++){
                    results[i]["giveBackLink"] = "/user/librarian/trasach?userId="+results[i].userId;
                    results[i]["borrwingLink"] = "/user/librarian/thuthumuon?userId="+results[i].userId;
                    users.push(results[i]);
                }
                console.log(users);
                return res.render("librarianSearch", {
                    layout: "layout", ...populateHeader(req.user),
                    users: users,
                    
                });
            }
            else {
                return res.render("librarianSearch", {
                    layout: "layout", ...populateHeader(req.user),
                    error: 'Invalid ID',
                });
            }


        });
    }
    else {
        return res.render("librarianSearch", { layout: "layout", ...populateHeader(req.user) });
    }


}

const addAccount = (req, res, next) => {
    console.log(req.body);
    user = { ...req.body };
    userRepo.insert(user, (error, results, fields) => {
        if (error) {
            console.log("[INFO] can't create account");
            console.log(error);
        }
        else {
            console.log("[INFO] created account");
        }
    })
    res.redirect("/user/librarian/thuthuadd");
}

const borrowBooks = async (req, res, next) => {
    if (req.query.userId) {
        console.log("[INFO] " + req.query.userId);

        var name = [];
        var bookTitle = [];
        userRepo.findById(req.query.userId, (error, results, fields) => {
            if (results.length !== 0) {
                name.push(results[0].name);

                borrowRequestRepo.findBookDescFromBorrowRequestByUserId(req.query.userId, (error, results, fields) => {
                    results.forEach(ele => {
                        bookTitle.push(ele.title);
                    });
                    if (results.length !== 0) {
                        console.log("[INFO] " + results[0]['publisher']);
                    }

                    res.render("librarianBorrowing", {
                        layout: "layout", ...populateHeader(req.user),
                        name: name,
                        borrowingBooks: results,
                        userId: req.query.userId,
                    });
                });

            }
            else {
                res.render("librarianBorrowing", {
                    layout: "layout", ...populateHeader(req.user),
                    error: "error",
                });
            }
        });

    }
    else {
        res.render("librarianBorrowing", { layout: "layout", ...populateHeader(req.user) });
    }
}
const saveBorrowBooks = (req, res, next) => {
    console.log(req.body);
    var borrows = req.body;
    for (i = 0; i < borrows.bookDescriptionId.length; i++) {
        console.log(i);
        let borrow = {
            userId: borrows.userId,
            bookDescriptionId: borrows.bookDescriptionId[i],

        }
        
        bookRepo.getBookAvilable(borrow.bookDescriptionId, (error, results, fields) => {
            if (results.length != 0) {
             
                borrow["bookId"] = results[0].bookId;
                console.log(borrow);

                borrowRequestRepo.updateIsLent(borrow.userId, borrow.bookDescriptionId,
                    (error, results, fields) => {
                        if (error) {
                            console.log("[INFO] error");
                            console.log(error);
                        }
                        else {
                            console.log("[INFO] lented");
                        }
                    });

                borrowRepo.insert(borrow, (error, results, fields) => {
                    if (error) {
                        console.log("[INFO] can't borrowed book");
                        console.log(error);
                    }
                    else {
                        console.log("[INFO] borrowed book");
                    }
                });
                bookRepo.updateAvailable(borrow.bookId, false, (error, results, fields) => {
                    if (error) {
                        console.log("[INFO] can't bupdate avaliable ");
                        console.log(error);
                    }
                    else {
                        console.log("[INFO] update avaliable");
                    }
                });
            }
        });


    }
    res.redirect("/user/librarian/thuthumuon");
}
const calFine = (date) =>{
    var date = new Date(date);
    var now = new Date();

    var day = Math.max((now - date)/(24*60*60*1000) - 14, 0);
    console.log(day);
    return 2000*day;
}
const giveBackBook = (req, res, next) => {

    if (req.query.userId) {
        console.log("[INFO] " + req.query.userId);

        userRepo.findById(req.query.userId, (error, results, fields) => {
            if (results.length !== 0) {
               
                borrowRepo.findBorrowingBookByUserId(req.query.userId, (error, results, fields) => {
                    let borrowedBooks = results;
                    let totalFine = 0;
                    for( i = 0 ;i < borrowedBooks.length ; i++){
                        borrowedBooks[i].fine = calFine(borrowedBooks[i].borrowDate);
                        totalFine += borrowedBooks[i].fine;
                    }
                    

                    res.render("librarianGiveBack", {
                        layout: "layout", ...populateHeader(req.user),
                        userId: req.query.userId,
                        borrowedBooks: results,
                        totalFine: totalFine,
                    });
                });
            }
            else {
                res.render("librarianGiveBack", { layout: "layout", ...populateHeader(req.user) });
            }
        });
    }
    else {
        res.render("librarianGiveBack", { layout: "layout", ...populateHeader(req.user) });
    }
};

const saveGiveBackBook = (req, res, next) => {

    var bookIds = req.body.bookId;
    for (i = 0; i < bookIds.length; i++) {
        if (bookIds[i] !== '') {
            var bookReturn = {
                userId: req.body.userId,
                bookId: bookIds[i],
                bookDescriptionId: req.body.bookDescriptionId[i],
            }
            console.log(bookReturn);
            bookRepo.updateAvailable(bookReturn.bookId,true,(error, results, fields) => {
                if (error) {
                    console.log("[INFO] error");
                    console.log(error);
                }
                else {
                    console.log("[INFO] updated avilable");
                }
            });
            borrowRepo.updateReturned(bookReturn, (error, results, fields) => {
                if (error) {
                    console.log("[INFO] error");
                    console.log(error);
                }
                else {
                    console.log("[INFO] returned");
                }
            });
            borrowRequestRepo.deleteRow(bookReturn.userId,bookReturn.bookDescriptionId,(error, results, fields) => {
                if (error) {
                    console.log("[INFO] error");
                    console.log(error);
                }
                else {
                    console.log("[INFO] deleted");
                }
            });
        }
    }
    res.redirect("/user/librarian/trasach");
};
const saveBook = (req, res, next) => {
    console.log(req.body);
    bookRepo.insertBookDescription(req.body,(error, results, fields) => {
        if (error) {
            console.log("[INFO] error");
            console.log(error);
        }
        else {
            for(i = 0 ;i < req.body.number;i++){
                bookRepo.insertBook(results.insertId, (error, results, fields) => {
                    if(!error){
                        console.log("[INFO] insert new book")
                    }
                });
            }
            console.log("results "+results.insertId);
            console.log("[INFO] save new book");
            res.redirect("/user/librarian/themsach");
        }
    });

};
const addBook = (req, res, next) => {
    bookRepo.getListTags((error, results, fields) => {
        if (!error) {
            if (results.length !== 0) {
                var tags = [];
                for (i = 0; i < results.length; i++) {
                    console.log(results[i]);
                    if (results[i].tagName != "All") {
                        tags.push(results[i]);
                    }
                }
                res.render("librarianAddBooks", { layout: "layout", ...populateHeader(req.user), tags: tags, imgUrl: req.query.imgUrl });
            }
        }
        else {
            res.render("librarianAddBooks", { layout: "layout", ...populateHeader(req.user) });
        }
    });

}

const uploadImage = (req, res, next) =>{
    if(req.file){
        let filename = "http://localhost:3000/images/"+req.file.filename;
        res.redirect("/user/librarian/themsach?imgUrl="+filename);
    }
    else {
        res.redirect("/user/librarian/themsach");
    }
};
module.exports = {
    searchUser,
    addAccount,
    borrowBooks,
    saveBorrowBooks,
    giveBackBook,
    saveGiveBackBook,
    addBook,
    saveBook,
    uploadImage,
}