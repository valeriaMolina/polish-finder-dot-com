/**
 * @author Valeria Molina Recinos
 */

const { query, validationResult } = require('express-validator');

exports.validateAllPolishesSearch = [
    query('page', 'Page number is required').isNumeric().not().isEmpty(),
    query('limit', 'Limit is required').isNumeric().not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
