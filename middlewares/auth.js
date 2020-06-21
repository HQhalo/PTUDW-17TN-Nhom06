
// authorization
const ROLE_USER = {};
const ROLE_LIBRARIAN = {
    ROLE_USER
};
const ROLE_PROFESSOR = {
    ROLE_USER
};

const ROLES = {
    ROLE_USER,
    ROLE_LIBRARIAN,
    ROLE_PROFESSOR
}

const checkRole = (userRole, role) => {
    if (userRole === role)
        return true;
    
    return Object.keys(ROLES[userRole]).some(uRole => checkRole(uRole, role));
}
// -----------------------------------------------------------------------------

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
        return;
    }
    res.redirect('/');
}

const hasRole = (role) => {
    return (req, res, next) => {
        if (req.isAuthenticated() && checkRole(req.user.role, `ROLE_${role}`)) {
            next();
            return;
        }
        res.redirect('/');
    }
}

module.exports = {
    checkAuthenticated,
    hasRole
}