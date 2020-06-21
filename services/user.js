var userRepo = require('../repositories/user');

const insert = (user, cb) => {
    userRepo.insert(user, cb);
}

const findById = (id, cb) => {
    userRepo.findById(id, (error, results, fields) => {
        cb(error, results[0]);
    });
}

module.exports = {
    insert,
    findById
}