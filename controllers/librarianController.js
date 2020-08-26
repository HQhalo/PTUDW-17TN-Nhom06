var userRepo = require('../repositories/user');
var borrowReeRepo = require('../repositories/borrowRequest');
const { populateHeader } = require('../utils/data');
const password = require('../utils/password');
const roles = require('../constants/roles');

const searchUser = (req, res, next) => {

    if (req.query.userid) {
        userRepo.findById(req.query.userid, (error, results, fields) => {
            var users = []
            if ( results.length !== 0){
                console.log("[INFO] : " + results[0].name);
                users = [
                    {
                        name: results[0].name,
                        avatar: results[0].avatar,
                    }
                ]
            }
            
            return res.render("librarianSearch", {
                layout: "layout", ...populateHeader(req.user),
                users
            });
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

const  borrowBooks = async (req, res, next) => {
    if (req.query.userId) {
        console.log("[INFO] " + req.query.userId);
        var name = [];
        var bookTitle = [];
        userRepo.findById(req.query.userId, (error, results, fields) => {
            if ( results.length !== 0){
                name.push(results[0].name);

                borrowReeRepo.findBookDescFromBorrowRequestByUserId(req.query.userId, (error, results, fields)=>{
                    results.forEach(ele =>{
                        bookTitle.push(ele.title);
                    });
                    if ( results.length !== 0){
                        console.log("[INFO] " + results[0]['publisher']);
                    }

                    res.render("librarianBorrowing", { layout: "layout", ...populateHeader(req.user),
                        name: name,
                        borrowingBooks: results,
                        userId: req.query.userId,
                    });
                });

            }
        });
  
    }
    else {
        res.render("librarianBorrowing", { layout: "layout", ...populateHeader(req.user) });
    }
}

module.exports = {
    searchUser,
    addAccount,
    borrowBooks,
}