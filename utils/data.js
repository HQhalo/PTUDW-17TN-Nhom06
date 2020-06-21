const {ROLE_LIBRARIAN} = require('../constants/roles');

const populateHeader = (user) => {
    if (!user)
        return {};
    
    return {
        username: user.name,
        avatar: user.avatar,
        librarian: user.role === ROLE_LIBRARIAN
    };
}

module.exports = {
    populateHeader
}