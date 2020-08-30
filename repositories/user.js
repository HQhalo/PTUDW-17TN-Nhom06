var pool = require('../mysql');
var passwordUtil = require('../utils/password');
const password = require('../utils/password');
const insert = (user, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        var {id, password, name, phone, email, avatar, role} = user;
        password = passwordUtil.hashPassword(password);
        // Use the connection
        connection.query("insert into user_tb (userid, password, name, phone, email, avatar, role) values (?,?,?,?,?,?,?)",
            [id, password, name, phone, email, avatar, role],
            function (error, results, fields) {
                // When done with the connection, release it.
                connection.release();
                // pass result to callback function
                cb(error, results, fields);
            });
    });
}

const findById = (id, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('SELECT u.*, role.name as roleName FROM user_tb as u JOIN role on u.role = role.id where userId = ?',
            [id],
            function (error, results, fields) {
                connection.release();
                cb(error, results, fields);
            });
    });
}

const updateInfo = function(id,email,phone,cb) {
    pool.getConnection(function(err,connection) {
        if (err) throw err;

        connection.query('UPDATE user_tb SET email=? , phone=? WHERE userId=?', 
            [email,phone,id],
            function (error, results,fields){
                connection.release();
                cb(error,results,fields);
        });
    });
}

const updatePassword = function(id, pass,cb){
    pool.getConnection(function(err,connection){
        if (err) throw err;

        connection.query('UPDATE user_tb SET password=? WHERE userId=?',
            [pass,id],
            function (error, results,fields){
                connection.release();
                cb(error,results,fields);
            });
    });
}

module.exports = {
    insert,
    findById,
    updateInfo,
    updatePassword
}