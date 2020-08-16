var bookRepo = require('../repositories/book');
const e = require('express');

const getListBooks = (offset, limit, cb) => {
    bookRepo.getListBooks(offset, limit, (listErr, listRes, fields) => {
        if (listErr) {
            cb(listErr);
        } else {
            cb(null, listRes);
        }
    });
}

const getNumBooks = (cb) => {
    bookRepo.getNumBooks((err, res) => {
        if (err) {
            return cb(err);
        }
        cb(null, res[0].total);
    });
}

const getListBooksWithTotal = (offset, limit, cb) => {
    bookRepo.getListBooks(offset, limit, (listErr, listRes, fields) => {
        if (listErr) {
            cb(listErr);
        } else {
            bookRepo.getNumBooks((numErr, numRes) => {
                if (numErr) {
                    return cb(numErr);
                }
                cb(null, {total: numRes[0].total, list: listRes});
            });
        }
    });
}

const getListBooksWithTotalByTag = (tagId, offset, limit, cb) => {
    if (tagId === 0)
        return getListBooksWithTotal(offset, limit, cb);
        
    bookRepo.getListBooksByTag(tagId, offset, limit, (listErr, listRes, fields) => {
        if (listErr) {
            cb(listErr);
        } else {
            bookRepo.getNumBooksByTag(tagId, (numErr, numRes) => {
                if (numErr) {
                    return cb(numErr);
                }
                cb(null, {total: numRes[0].total, list: listRes});
            });
        }
    });
}

const getListTags = (cb) => {
    bookRepo.getListTags((listErr, listRes, fields) => {
        if (listErr) {
            return cb(listErr);
        }
        cb(null, listRes);
    });
}

const getBookInfoById = (bookId, cb) => {
    bookRepo.getBooksById(bookId, (errDes, resDes) => {
        if (errDes) {
            return cb(errDes);
        }
        bookRepo.countAvailable(bookId, (errCount, resCount) => {
            if (errCount) {
                return cb(errCount);
            }
            bookRepo.getRating(bookId, (errRate, resRate) => {
                if (errRate) {
                    return cb(errRate);
                } 
                cb(null, {...resDes[0], ...resCount[0], ...resRate[0]});
            });
        });
    });
}

const getListCommentsWithTotal = (bookDescriptionId, offset, limit, cb) => {
    bookRepo.getListComments(bookDescriptionId, offset, limit, (listErr, listRes, fields) => {
        if (listErr) {
            cb(listErr);
        } else {
            bookRepo.getNumComments(bookDescriptionId, (numErr, numRes) => {
                if (numErr) {
                    return cb(numErr);
                }
                cb(null, {total: numRes[0].total, list: listRes});
            });
        }
    });
}

module.exports = {
    getListBooksWithTotal,
    getListBooksWithTotalByTag,
    getListBooks,
    getListTags,
    getNumBooks,
    getBookInfoById,
    getListCommentsWithTotal
}