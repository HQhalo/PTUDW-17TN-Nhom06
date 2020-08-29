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

const deleteRow = (userId,bookDescriptionId,next) =>{
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        connection.query("DELETE FROM borrowRequest WHERE userId = ? AND bookDescriptionId = ?",
        [userId,bookDescriptionId],
        function (error, results, fields) { 
            connection.release();
            next(error, results, fields);
        });
    });
};
module.exports = {
    insert,
    findBookDescFromBorrowRequestByUserId,
    updateIsLent,
    deleteRow,
}