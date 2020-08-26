const {getListBooks, getListTags, getListBooksWithTotalByTag} = require('../services/book');
const {populateHeader} = require('../utils/data');
const {getRandomInt} = require('../utils/common');

const homepage = function(req, res, next) {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 12;
    const tagId = req.query.tag ? parseInt(req.query.tag) : 0;
    getListBooksWithTotalByTag(tagId, offset, limit, (err, listBooksResult) => {
        if (err) {
            return next(err);
        }
        getListTags((err, listTagsResult) => {
            if (err) {
                return next(err);
            }
            listTagsResult.some(tag => {
                if (tag.tagId === tagId) {
                    tag.isChosen = true;
                    return true;
                }
                return false;
            });
            const randomOffset = getRandomInt(0, listBooksResult.total - 3);
            getListBooks(randomOffset, 3, (err, listRandomResult) => {
                if (err) {
                    return next(err);
                }
                res.render('index', {
                    ...populateHeader(req.user),
                    books: listBooksResult.list,
                    pagination: {
                        currentPage: Math.floor(offset / limit + 1),
                        totalPage: Math.ceil(listBooksResult.total / limit),
                        pageSize: limit,
                        uri: "/",
                        tagId: tagId
                    },
                    tags: listTagsResult,
                    features: listRandomResult
                });
            });
        });
    });
}

module.exports = {
    homepage
}