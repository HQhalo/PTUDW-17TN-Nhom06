var pool = require('../mysql');

const insert = (borrowRequest, next)=>{
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        const {id, bookid} = borrowRequest;
        connection.query("INSERT INTO borrowRequest ( userId , bookDescriptionId ) values(?,?)",
        [id,bookid],
        function (error, results, fields) {
            connection.release();
            next(error, results, fields);
        });
    });
    
}

const findBookDescFromBorrowRequestByUserId = (userId,next) =>{
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        connection.query("SELECT br.bookDescriptionId , bd.title , bd.publisher, bd.imgUrl FROM borrowRequest br LEFT JOIN bookDescription bd ON br.bookDescriptionId = bd.bookDescriptionId WHERE br.userId = ? AND br.isLent = ?",
        [userId,false],
        function (error, results, fields) {
            connection.release();
            next(error, results, fields);
        });
    });
}

const updateIsLent = (userId,bookDescriptionId,next) =>{
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        connection.query("UPDATE borrowRequest SET isLent = ? WHERE userId = ? AND bookDescriptionId = ?",
        [true,userId,bookDescriptionId],
        function (error, results, fields) {
            connection.release();
            next(error, results, fields);
        });
    });
}
const findBookBorrowRequestByUserId = function(userId,next){
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        connection.query("SELECT br.bookDescriptionId as id, bd.title as title, bd.publisher as publisher, bd.imgUrl as imgUrl FROM borrowRequest br LEFT JOIN bookDescription bd ON br.bookDescriptionId = bd.bookDescriptionId WHERE br.userId = ? AND br.isLent = ?",
        [userId,'0'],
        function (error, results, fields) {
            connection.release();
            next(error, results, fields);
        });
    });
}

const findHistoryBorrowBookByUserId = function(userId,next){
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        connection.query("SELECT b.borrowDate as date, b.returned as returned, b.fine as fine , bd.isbn10 as isbn10, bd.isbn13 as isbn13, bd.title as title, bd.pubYear as pubYear, bd.publisher as publisher, bd.imgUrl as imgUrl, bd.bookDescriptionId as Id FROM borrow b JOIN bookDescription bd ON b.bookDescriptionId = bd.bookDescriptionId WHERE b.userId = ?",
        [userId],
        function (error, results, fields) {
            connection.release();
            next(error, results, fields);
        });
    });
}

module.exports = {
    insert,
    findBookDescFromBorrowRequestByUserId,
    updateIsLent,
    findBookBorrowRequestByUserId,
    findHistoryBorrowBookByUserId
}