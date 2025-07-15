/**
 * @author Valeria Molina Recinos
 */

const { Op } = require('sequelize');
const { query, check, validationResult } = require('express-validator');
const brandService = require('../../../brands/service/brand-service');
const typeService = require('../../../polish/service/type-service');
const colorService = require('../../../polish/service/color-service');
const formulaService = require('../../../polish/service/formula-service');
const searchService = require('../../../search/service/search-service');
const logger = require('../../../../libraries/logger/logger');
const { NoFiltersError } = require('../../../../libraries/utils/error-handler');

const isNull = (element) => element === null || element === undefined;

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

exports.validateSearch = [
    check('brandName').isString().optional(),
    check('type').isString().optional(),
    check('primaryColor').isString().optional(),
    check('effectColors').isArray().optional(),
    check('formulas').isArray().optional(),
    check('name').isString().optional(),
    /**
     * Middleware function to validate and process search parameters.
     * It checks for at least one filter, validates the provided filters, and fetches their corresponding IDs from the database.
     *
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     * @param {Function} next - The next middleware function in the stack
     *
     * @returns {void}
     */
    async (req, res, next) => {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                logger.error('No filter specified');
                throw new NoFiltersError('No filters were specified');
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            req.search = await searchService.validateFilters(req.body);
            next();
        } catch (error) {
            if (error.statusCode) {
                return res.status(error.statusCode).json({ error });
            } else {
                logger.error(
                    `Error while validating search filters: ${error.message}`
                );
                return res.status(500).json(error);
            }
        }
    },
];
