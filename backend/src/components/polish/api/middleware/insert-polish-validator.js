/**
 * @author Valeria Molina Recinos
 */

const { check, validationResult } = require('express-validator');
const logger = require('../../../../libraries/logger/logger');

exports.validateInsertPolish = [
    check('brandName', 'Name is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('primaryColor', 'Primary color is required').not().isEmpty(),
    check('effectColors', 'Effect colors are required')
        .not()
        .isEmpty()
        .isArray(),
    check('formulas', 'Formulas are required').not().isEmpty().isArray(),
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').isString(),
    (req, res, next) => {
        logger.info('Validating polish insert request');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(`Error validating polish insert request:`);
            for (const error of errors.array()) {
                logger.error(`${error.msg}`);
            }
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

exports.validateAttributeInsert = [
    check('name').not().isEmpty(),
    (req, res, next) => {
        logger.info('Validating color insert request');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(`Error validating color insert request:`);
            for (const error of errors.array()) {
                logger.error(`${error.msg}`);
            }
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
