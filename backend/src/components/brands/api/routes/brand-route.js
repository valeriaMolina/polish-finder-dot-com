/**
 * @author Valeria Molina Recinos
 * Handles requests from mods to add a new brand into the database.
 */

const router = require('express').Router();
const {
    validateInsertBrand,
    validateGetBrand,
} = require('../middleware/brand-validator');
const {
    authenticateToken,
    authorize,
} = require('../../../rbac/api/middleware/rbac-middeware');
const permissions = require('../../../../libraries/constants/permissions');
const brandService = require('../../service/brand-service');
const logger = require('../../../../libraries/logger/logger');

/**
 * Handles the POST request to add a new brand into the database.
 *
 * @param {Object} req - The request object containing the body with the brand name.
 * @param {Object} res - The response object to send back the result.
 * @param {string} req.body.name - The name of the brand to be added.
 * @returns {void}
 */
router.post(
    '/new',
    authenticateToken,
    authorize(permissions.UPLOAD_BRAND),
    validateInsertBrand,
    async (req, res) => {
        try {
            logger.info(`Received request to insert new brand`);
            const newBrand = await brandService.newBrandInsert(req.body);
            res.status(201).json(newBrand);
        } catch (err) {
            if (err.statusCode) {
                return res.status(err.statusCode).send({ error: err.message });
            } else {
                // error was not anticipated
                return res.status(500).send({ error: err.message });
            }
        }
    }
);

/**
 * Handles the GET request to retrieve all brands from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back the result.
 * @returns {void}
 *
 * @async
 * @throws Will throw an error if there is a problem with the database request.
 *
 * @example
 * router.get('/all', async (req, res) => { ... });
 */
router.get('/all', async (_, res) => {
    try {
        logger.info(`Received request to get all brands`);
        const brands = await brandService.getAllBrands();
        res.status(200).json(brands);
    } catch (err) {
        if (err.statusCode) {
            return res.status(err.statusCode).send({ error: err.message });
        } else {
            // error was not anticipated
            return res.status(500).send({ error: err.message });
        }
    }
});

router.get('/:brandId', validateGetBrand, async (req, res) => {
    try {
        logger.info(
            `Received request to get brand by id: ${req.params.brandId}`
        );
        const { brandId } = req.params;
        const brand = await brandService.getBrand(brandId);
        return res.status(200).json(brand);
    } catch (err) {
        if (err.statusCode) {
            return res.status(err.statusCode).send({ error: err.message });
        } else {
            // error was not anticipated
            return res.status(500).send({ error: err.message });
        }
    }
});

module.exports = router;
