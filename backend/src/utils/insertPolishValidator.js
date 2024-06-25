/**
 * @author Valeria Molina Recinos
 */

const { check, query, validationResult } = require('express-validator');

exports.validateInsertPolish = [
    check('brandName', 'Name is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('primaryColor', 'Primary color is required').not().isEmpty(),
    check('effectColors', 'Effect colors are required').not().isEmpty(),
    check('formulas', 'Formulas are required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

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

exports.validateLinkDupe = [
    query('polishId', 'Polish ID is required').not().isEmpty(),
    query('dupeId', 'Dupe ID is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
