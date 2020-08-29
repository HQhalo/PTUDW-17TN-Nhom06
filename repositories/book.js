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

const getListBooksWithSearchterm = (searchterm, offset, limit, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        searchterm = `%${searchterm}%`;
        connection.query('SELECT * FROM bookDescription WHERE title LIKE ? LIMIT ? OFFSET ?',
            [searchterm, limit, offset],
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

const getNumBooksByTerm = (searchterm, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        searchterm = `%${searchterm}%`;
        connection.query('SELECT count(*) as total FROM bookDescription WHERE title LIKE ?',
            [searchterm],
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
const getBookAvilable = (bookDescriptionId, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query("SELECT bookId FROM book WHERE bookDescriptionId = ? AND available = 1",
        [bookDescriptionId],
        function (error, results, fields) {
            connection.release();
            cb(error, results, fields);
        });
    });
}
const updateAvailable = (bookId,available, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('UPDATE book SET available = ? WHERE bookId = ?',
            [available,bookId],
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
        connection.query('SELECT c.*, u.name, u.avatar FROM comments c JOIN user_tb u on c.userId = u.userId WHERE bookDescriptionId = ? ORDER BY c.commentId DESC LIMIT ? OFFSET ?',
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
const insertBook = (bookDescriptionId,next)=>{
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        connection.query("INSERT INTO book  VALUES(default,?,?)",
        [bookDescriptionId,true],
        function (error, results, fields) {
            connection.release();
            next(error, results, fields);
        });
    });
}
const insertBookDescription = (bd,next)=>{
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        connection.query("insert into bookDescription values (default,?,?,?,?,?,?,?,?)",
        [bd.isbn10,bd.isbn13,bd.title,bd.description,bd.pubYear,bd.publisher,bd.tagId,bd.imgUrl],
        function (error, results, fields) {
            connection.release();
            next(error, results, fields);
        });
    });
}

const getNumPendingBorrowRequest = (userId, bookDescriptionId, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('SELECT count(*) as total FROM borrowRequest WHERE userId = ? AND bookDescriptionId = ?',
            [userId, bookDescriptionId],
            function (error, results, fields) {
                connection.release();
                cb(error, results, fields);
            });
    });
}

const addBorrowRequest = (userId, bookDescriptionId, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('INSERT INTO borrowRequest (userId, bookDescriptionId) VALUES (?,?)',
            [userId, bookDescriptionId],
            function (error, results, fields) {
                connection.release();
                cb(error, results, fields);
            });
    });
}

const getNumBorrow = (userId, bookDescriptionId, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('SELECT count(*) as total FROM borrow WHERE userId = ? AND bookDescriptionId = ?',
            [userId, bookDescriptionId],
            function (error, results, fields) {
                connection.release();
                cb(error, results, fields);
            });
    });
}

const addComment = (userId, bookDescriptionId, content, starNo, cb) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('INSERT INTO comments (userId, bookDescriptionId, content, starNo) VALUES (?,?,?,?)',
            [userId, bookDescriptionId, content, starNo],
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
    getNumComments,
    getBookAvilable,
    updateAvailable,
    insertBook,
    insertBookDescription,
    getNumPendingBorrowRequest,
    addBorrowRequest,
    getNumBorrow,
    addComment,
    getListBooksWithSearchterm,
    getNumBooksByTerm
}