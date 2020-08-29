const {getBookInfoById, getListCommentsWithTotal, checkSentRequest, addBorrowRequest, checkHaveBorrowed} = require('../services/book');
const {populateHeader} = require('../utils/data');
const { addComment } = require('../repositories/book');

const DEFAULT_COMMENTS_PAGE_SIZE = 2;

const viewBook = function(req, res, next) {
    getBookInfoById(req.params.bookId, (errInfo, resInfo) => {
        if (errInfo) {
            return next(errInfo);
        }
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : DEFAULT_COMMENTS_PAGE_SIZE;
        getListCommentsWithTotal(req.params.bookId, offset, limit, (errCmt, resCmt) => {
            if (errCmt) {
                return next(errCmt);
            }
            checkSentRequest(req.user.userId, req.params.bookId, (checkErr, checkRes) => {
                if (checkErr) {
                    return next(checkErr);
                }
                checkHaveBorrowed(req.user.userId, req.params.bookId, (checkBorrowErr, checkBorrowRes) => {
                    if (checkBorrowErr) {
                        return next(checkBorrowErr);
                    }
                    res.render('book', {
                        ...populateHeader(req.user),
                        bookDescription: {
                            ...resInfo,
                            canBorrow: resInfo.total > 0 && !checkRes
                        },
                        pagination: {
                            currentPage: Math.floor(offset / limit + 1),
                            totalPage: Math.ceil(resCmt.total / limit),
                            pageSize: limit,
                            uri: req._parsedOriginalUrl.pathname,
                        },
                        comments: resCmt.list,
                        allowComment: checkBorrowRes
                    });
                });
            });
        });
    });
}

const borrowBook = function(req, res, next) {
    const {bookId} = req.params;
    addBorrowRequest(req.user.userId, bookId, (addErr, addRes) => {
        res.redirect(`/book/${bookId}`);
    });
}

const commentBook = function(req, res, next) {
    const {bookId} = req.params;
    const {comment, star} = req.body;
    addComment(req.user.userId, bookId, comment, star, (errAdd, resAdd) => {
        res.redirect(`/book/${bookId}`);
    });
}

module.exports = {
    viewBook,
    borrowBook,
    commentBook
}