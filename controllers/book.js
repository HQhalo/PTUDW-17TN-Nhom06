const {getBookInfoById, getListCommentsWithTotal} = require('../services/book');
const {populateHeader} = require('../utils/data');

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
            res.render('book', {
                ...populateHeader(req.user),
                bookDescription: {
                    ...resInfo
                },
                pagination: {
                    currentPage: Math.floor(offset / limit + 1),
                    totalPage: Math.ceil(resCmt.total / limit),
                    pageSize: limit,
                    uri: req._parsedOriginalUrl.pathname,
                },
                comments: resCmt.list
            });
        });
    });
}

module.exports = {
    viewBook
}