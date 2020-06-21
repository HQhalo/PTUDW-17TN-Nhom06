const passport = require('passport')
const {ROLE_LIBRARIAN} = require('../constants/roles');

const login = passport.authenticate('local',
    {
        failureRedirect: '/auth/login'
    });

const loginSuccessHanlder = (req, res) => {
    if (req.user.role === ROLE_LIBRARIAN) {
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
    login,
    loginSuccessHanlder,
    logout
}