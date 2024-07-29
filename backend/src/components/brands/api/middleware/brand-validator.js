const { validationResult, check, param } = require('express-validator');

exports.validateInsertBrand = [
    check('name', 'Name is required').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

exports.validateGetBrand = [
    param('brandId', 'Brand ID must be a number').isNumeric().not().isEmpty(),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        next();
    },
];
