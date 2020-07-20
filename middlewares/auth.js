
// authorization (role hierarchy)
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
    
    if (ROLES[userRole] == undefined)
        return false;

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
        if (req.isAuthenticated() && checkRole(req.user.roleName, `ROLE_${role}`)) {
            return next();
        }
        res.redirect('/');
    }
}

module.exports = {
    checkAuthenticated,
    hasRole
}