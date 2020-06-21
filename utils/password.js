const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = (input) => {
    return bcrypt.hashSync(input, saltRounds);
}

const checkPassword = (input, password) => {
    return bcrypt.compareSync(input, password);
}

module.exports = {
    hashPassword,
    checkPassword
}