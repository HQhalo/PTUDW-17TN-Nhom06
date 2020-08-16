var pool = require('../mysql');

const getListBooks = (offset, limit, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM bookDescription LIMIT ? OFFSET ?',
            [limit, offset],
            function (error, results, fields) {
                connection.release();
                cb(error, results, fields);
            });
    });
}

const getListBooksByTag = (tagId, offset, limit, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM bookDescription WHERE tagId = ? LIMIT ? OFFSET ?',
            [tagId, limit, offset],
            function (error, results, fields) {
                connection.release();
                cb(error, results, fields);
            });
    });
}

const getBooksById = (bookId, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM bookDescription WHERE bookDescriptionId = ?',
            [bookId],
            function (error, results, fields) {
                connection.release();
                cb(error, results, fields);
            });
    });
}

const getNumBooks = (cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('SELECT count(*) as total FROM bookDescription',
            function (error, results, fields) {
                connection.release();
                cb(error, results, fields);
            });
    });
}

const getNumBooksByTag = (tagId, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('SELECT count(*) as total FROM bookDescription WHERE tagId = ?',
            [tagId],
            function (error, results, fields) {
                connection.release();
                cb(error, results, fields);
            });
    });
}

const getListTags = (cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('SELECT * FROM tag',
            function (error, results, fields) {
                connection.release();
                cb(error, results, fields);
            });
    });
}

const countAvailable = (bookDescriptionId, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('SELECT count(*) as total FROM book WHERE bookDescriptionId = ? AND available = 1',
            [bookDescriptionId],
            function (error, results, fields) {
                connection.release();
                cb(error, results, fields);
            });
    });
}

const getRating = (bookDescriptionId, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('SELECT avg(starNo) as rate FROM comments WHERE bookDescriptionId = ?',
            [bookDescriptionId],
            function (error, results, fields) {
                connection.release();
                cb(error, results, fields);
            });
    });
}

const getListComments = (bookDescriptionId, offset, limit, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('SELECT c.*, u.name, u.avatar FROM comments c JOIN user_tb u on c.userId = u.userId WHERE bookDescriptionId = ? LIMIT ? OFFSET ?',
            [bookDescriptionId, limit, offset],
            function (error, results, fields) {
                connection.release();
                cb(error, results, fields);
            });
    });
}

const getNumComments = (bookDescriptionId, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('SELECT count(*) as total FROM comments WHERE bookDescriptionId = ?',
            [bookDescriptionId],
            function (error, results, fields) {
                connection.release();
                cb(error, results, fields);
            });
    });
}

module.exports = {
    getListBooks,
    getListBooksByTag,
    getNumBooks,
    getNumBooksByTag,
    getListTags,
    getBooksById,
    countAvailable,
    getRating,
    getListComments,
    getNumComments
}