/**
 * @author Valeria Molina Recinos
 */

const { Op } = require('sequelize');
const { query, check, validationResult } = require('express-validator');
const brandService = require('../../../brands/service/brand-service');
const typeService = require('../../../polish/service/type-service');
const colorService = require('../../../polish/service/color-service');
const formulaService = require('../../../polish/service/formula-service');
const logger = require('../../../../libraries/logger/logger');

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
        // make sure that there is at least one filter present for displaying search results
        const length = Object.keys(req.body).length;
        if (length === 0) {
            return res.status(400).json({
                error: 'At least one filter must be provided.',
            });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        req.search = {};
        // validate the provided filters
        if (req.body.brandName) {
            // find brand id by brand name
            const brand = await brandService.findBrandNameInTable(
                req.body.brandName
            );
            if (!brand) {
                return res.status(400).json({
                    error: `Brand ${req.body.brandName} does not exist in database`,
                });
            }
            req.search.brand_id = brand.brand_id;
        }
        if (req.body.type) {
            // find type id by type name
            const type = await typeService.findTypeByName(req.body.type);
            if (!type) {
                return res.status(400).json({
                    error: `Type ${req.body.type} does not exist in database`,
                });
            }
            req.search.type_id = type.type_id;
        }
        if (req.body.primaryColor) {
            // find primary color id by color name
            const primaryColor = await colorService.findColorByName(
                req.body.primaryColor
            );
            if (!primaryColor) {
                return res.status(400).json({
                    error: `Primary color ${req.body.primaryColor} does not exist in database`,
                });
            }
            req.search.primary_color = primaryColor.color_id;
        }
        if (req.body.effectColors && req.body.effectColors.length > 0) {
            // find effect color ids by color names
            const effectColorIds = await Promise.all(
                req.body.effectColors.map(async (color) =>
                    colorService.findColorByName(color).then((colorObj) => {
                        if (colorObj) {
                            return colorObj.color_id;
                        } else {
                            return null;
                        }
                    })
                )
            );
            if (effectColorIds.some(isNull)) {
                const index = effectColorIds.indexOf(null);
                logger.error(
                    `Effect color ${req.body.effectColors[index]} does not exist in database`
                );
                return res.status(400).json({
                    error: `Effect color ${req.body.effectColors[index]} does not exist in database`,
                });
            }

            req.search.effect_colors = {
                [Op.contains]: effectColorIds,
            };
        }
        if (req.body.formulas && req.body.formulas.length > 0) {
            // find formula ids by formula names
            const formulaIds = await Promise.all(
                req.body.formulas.map(async (formula) =>
                    formulaService
                        .findFormulaByName(formula)
                        .then((formula) => {
                            if (formula) {
                                return formula.formula_id;
                            } else {
                                return null;
                            }
                        })
                )
            );
            if (formulaIds.some(isNull)) {
                const i = formulaIds.indexOf(null);
                logger.error(
                    `Formula ${req.body.formulas[i]} does not exist in database`
                );
                return res.status(400).json({
                    error: `Formula ${req.body.formulas[i]} does not exist in database`,
                });
            }
            req.search.formula_ids = {
                [Op.contains]: formulaIds,
            };
        }
        if (req.body.name) {
            req.search.name = req.body.name;
        }
        if (Object.keys(req.search).length === 0) {
            return res.status(400).json({
                error: 'Search parameters should not be empty.',
            });
        }
        next();
    },
];
