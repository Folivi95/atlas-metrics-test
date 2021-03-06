// PAGINATION
exports.getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

exports.getPagingData = (allData, page, limit) => {
    const { count: totalItems, rows: data } = allData;

    const currentPage = page ? ++page : 1;
    // const previousPage = currentPage ? -page : 1;
    // const nextPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { data, totalItems, totalPages, currentPage,  };
};