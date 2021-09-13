const db = require('../../models/index');
const Emission = db.emissions;
const AppError = require('../../config/appError');

exports.create = async (req, res, next) => {
    try {
        let {productId, emission, recordedAt} = req.body;

        let newEmission = {
            productId,
            emission,
            recordedAt
        };

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