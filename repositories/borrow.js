var pool = require('../mysql');

const insert = (borrow, next)=>{
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        const {userId, bookId,bookDescriptionId} = borrow;
        connection.query("INSERT INTO borrow ( userId, bookId,bookDescriptionId,borrowDate,returned ) VALUES(?,?,?,NOW(),?)",
        [userId, bookId,bookDescriptionId, false],
        function (error, results, fields) {
            connection.release();
            next(error, results, fields);
        });
    });
    
}

const findBorrowingBookByUserId = (userId,next) =>{
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        connection.query("SELECT  b.bookDescriptionId, bd.imgUrl, bd.title,b.bookId,b.borrowDate,b.fine FROM borrow b LEFT JOIN bookDescription bd ON b.bookDescriptionId = bd.bookDescriptionId WHERE b.userId = ? AND b.returned = ?",
        [userId,false],
        function (error, results, fields) {
            connection.release();
            next(error, results, fields);
        });
    });
}
const updateReturned = (bookReturn,next) =>{
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        connection.query("UPDATE borrow SET returned = ? WHERE userId = ? AND bookDescriptionId = ? AND bookId = ?",
        [true,bookReturn.userId,bookReturn.bookDescriptionId,bookReturn.bookId],
        function (error, results, fields) { 
            connection.release();
            next(error, results, fields);
        });
    });
}

const updateFine = (userId,bookDescriptionId,fine,next) =>{
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        connection.query("UPDATE borrow SET fine = ? WHERE userId = ? AND bookDescriptionId = ? AND bookId = ?",
        [fine,userId,bookDescriptionId,bookReturn.bookId],
        function (error, results, fields) { 
            connection.release();
            next(error, results, fields);
        });
    });
}
module.exports = {
    insert,
    findBorrowingBookByUserId,
    updateReturned,
    updateFine,
};