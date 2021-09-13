const {getPagination, getPagingData} = require('../../config/pagination');
const db = require('../../models/index');
const Emission = db.emissions;
const AppError = require('../../config/appError');

exports.get = async (req, res, next) => {
    try {
        let productId = req.params.id;
        let {page, size} = req.query;
        let emissions = [];

        if (page && page >= 0) {
            page = page - 1;
        } else {
            page = 0;
        }

        const {limit, offset} = getPagination(page, size);

        let query = {
            limit,
            offset,
            distinct: true,
            order: ['createdAt', 'DESC']
        };

        if (productId) {
            query.where.productId = productId;
        }

        emissions = await Emission.findAndCountAll(query);

        let {data, totalItems, totalPages, currentPage} = getPagingData(emissions, page, limit);

        let resp = {
            code: 200,
            status: 'success',
            message: 'Emissions retrieved successfully',
            data,
            totalItems,
            totalPages,
            currentPage
        };

        res.status(resp.code).json(resp);
        res.locals.resp = resp;
        return next();
    } catch (err) {
        console.error('Get Stats Error: ', err);
        return next(err);
    }
}

exports.getStats = async (req, res, next) => {
    try {
        let productId = req.params.id;
        let emissions = [];
        let average_emissions = 0;
        let total_emissions = 0;
        let item_with_highest_emission;
        let day_with_highest_emission;
        let highest_emission = 0;

        emissions = await Emission.findAll({where: {productId}});

        for (let item of emissions) {
            total_emissions += Number(item.emission);

            // check for highest emission
            if (item.emission > highest_emission) {
                highest_emission = item.emission;
                item_with_highest_emission = item;
            }
        }

        // calculate average emissions
        average_emissions = total_emissions / emissions.length;

        // set date with highest emission
        day_with_highest_emission = item_with_highest_emission.recordedAt;

        let resp = {
            code: 200,
            status: 'success',
            message: 'Emissions data retrieved successfully',
            data: {
                average_emissions,
                total_emissions,
                day_with_highest_emission
            }
        }

        res.status(resp.code).json(resp);
        res.locals.resp = resp;
        return next();
    } catch (err) {
        console.error('Get Stats Data Error: ')
    }
}