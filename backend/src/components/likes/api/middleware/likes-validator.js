/**
 * @author Valeria Molina Recinos
 */

const { check, validationResult, param } = require('express-validator');
const logger = require('../../../../libraries/logger/logger');

exports.validateLikeRequest = [
    check('email', 'Email is required').not().isEmpty().isString().isEmail(),
    check('polishId', 'Polish id is required').not().isEmpty().isNumeric(),
    (req, res, next) => {
        logger.info('Validating like request');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(
                `Error validating like request: ${JSON.stringify(errors.array())}`
            );
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

exports.validateGetLikesRequest = [
    param('email', 'email is required').isString().not().isEmpty().isEmail(),
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
