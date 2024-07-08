const { validationResult, check } = require('express-validator');

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
