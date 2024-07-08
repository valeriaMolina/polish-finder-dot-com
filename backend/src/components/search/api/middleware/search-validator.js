/**
 * @author Valeria Molina Recinos
 */

const { query, check, validationResult } = require('express-validator');

exports.validateDupeSearch = [
    query('polishId', 'Polish ID is required').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

exports.validateMatchSearch = [
    check('primaryColor', 'Primary color is required').not().isEmpty(),
    check('effectColors', 'Effect colors are required')
        .not()
        .isEmpty()
        .isArray(),
    check('formulas', 'Formulas are required').not().isEmpty().isArray(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
