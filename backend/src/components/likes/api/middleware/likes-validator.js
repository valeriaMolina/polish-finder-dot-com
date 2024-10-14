/**
 * @author Valeria Molina Recinos
 */

const { check, validationResult, param } = require('express-validator');
const logger = require('../../../../libraries/logger/logger');

exports.validateLikeRequest = [
    check('userId', 'User id is required').not().isEmpty().isNumeric(),
    check('polishId', 'Polish id is required').not().isEmpty().isNumeric(),
    (req, res, next) => {
        logger.info('Validating like request');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(`Error validating like request: ${errors.array()}`);
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

exports.validateGetLikesRequest = [
    param('userId', 'user id is required').isNumeric().not().isEmpty(),
    (req, res, next) => {
        logger.info('Validating get likes request');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(
                `Error validating get likes request: ${errors.array()}`
            );
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
