var pool = require('../mysql');

const insert = (user, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        const {id, password, name, phone, email, avatar, role} = user;
        // Use the connection
        connection.query("insert into user_tb (id, password, name, phone, email, avatar, role) values (?,?,?,?,?,?,?)",
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

        connection.query('select * from user_tb where userId = ?',
            [id],
            function (error, results, fields) {
                connection.release();
                cb(error, results, fields);
            });
    });
}

module.exports = {
    insert,
    findById
}