/**
 * @author Valeria Molina Recinos
 */

const { query, validationResult } = require('express-validator');

exports.validateSearch = [
    query('polishId', 'Polish ID is required').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
