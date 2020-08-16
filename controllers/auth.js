const passport = require('passport')
const {ROLE_LIBRARIAN} = require('../constants/roles');
const {getListBooks, getNumBooks} = require('../services/book');
const {getRandomInt} = require('../utils/common');

const loginPage = function(req, res, next) {
    getNumBooks((errNum, resNum) => {
        if (errNum) {
            return next(err);
        }

        const randomOffset = getRandomInt(0, resNum - 3);
        getListBooks(randomOffset, 3, (err, listRandomResult) => {
            if (err) {
                return next(err);
            }
            res.render('login', {
                features: listRandomResult
            });
        });
    });
}

const login = passport.authenticate('local',
    {
        failureRedirect: '/auth/login'
    });

const loginSuccessHanlder = (req, res) => {
    if (req.user.roleName === ROLE_LIBRARIAN) {
        return res.redirect('/user/librarian/thuthu');
    }
    res.redirect('/');
}

const logout = function(req, res, next) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}

module.exports = {
    loginPage,
    login,
    loginSuccessHanlder,
    logout
}