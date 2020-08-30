var hbs = require('hbs');

hbs.registerHelper('pagination', function (currentPage, totalPage, pageSize, uri, tagId, searchterm, options) {
    let context = {
        firstPageActive: false,
        pages: [],
        lastPageActive: false,
        prevRef: `${uri}?${searchterm !== '' ? `searchterm=${searchterm}&` : ''}${tagId ? `tag=${tagId}&` : ''}offset=${(currentPage - 2) * pageSize}&limit=${pageSize}`,
        nextRef: `${uri}?${searchterm !== '' ? `searchterm=${searchterm}&` : ''}${tagId ? `tag=${tagId}&` : ''}offset=${currentPage * pageSize}&limit=${pageSize}`
    };

    if (totalPage === 0 || currentPage === 1) {
        context.firstPageActive = true;
    }

    for (let i = 1; i <= totalPage; ++i) {
        context.pages.push({
            page: i,
            isCurrent: i === currentPage,
            ref: `${uri}?${searchterm !== '' ? `searchterm=${searchterm}&` : ''}${tagId ? `tag=${tagId}&` : ''}offset=${(i - 1) * pageSize}&limit=${pageSize}`
        });
    }

    if (totalPage === 0 || currentPage === totalPage) {
        context.lastPageActive = true;
    }

    return options.fn(context);
});

hbs.registerHelper('rating', function (rate, options) {
    rate = (rate && typeof rate === 'number') ? Math.round(rate) : 0;

    const context = {
        stars: [],
    };

    for (let i = 5; i >= 1; --i) {
        context.stars.push({
            isReach: i === rate,
        });
    }

    return options.fn(context);
});