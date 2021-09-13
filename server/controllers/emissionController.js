const db = require('../../models/index');
const Emission = db.emissions;
const AppError = require('../../config/appError');
const moment = require('moment');

exports.create = async (req, res, next) => {
    try {
        let {productId, emission, recordedAt} = req.body;

        let newEmission = {
            productId,
            emission,
            recordedAt
        };

        let request = ['productId', 'emission', 'recordedAt'];
        // check if request item is passed in request body
        request.map(item => {
            if (!req.body[item]) return next(new AppError(`${item} is required`, 400));
        })

        if (emission && (isNaN(emission) || emission === '')) {
            return next(new AppError('Emission should be a number', 400));
        }

        if (recordedAt && moment(recordedAt, "DD/MM/YYYY", true).isValid()) {
            return next(new AppError('RecordedAt date should be in the format DD/MM/YYYY', 400));
        }

        // convert recordedAt to date
        recordedAt = new Date(recordedAt).toISOString();

        const createdEmission = await Emission.create(newEmission);

        if (!createdEmission) {
            return next(new AppError('Failed to create emission', 500));
        }

        let resp = {
            code: 201,
            status: 'success',
            message: 'Emission created successfully',
            data: createdEmission
        }

        res.status(resp.code).json(resp);
        res.locals.resp = resp;
        return next();
    } catch (err) {
        console.error('Create Emission Error: ', err);
        return next(err);
    }
}