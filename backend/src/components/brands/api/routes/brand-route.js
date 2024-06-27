/**
 * @author Valeria Molina Recinos
 * Handles requests from mods to add a new brand into the database.
 */

const router = require('express').Router();
const { validateInsertBrand } = require('../middleware/brand-validator');
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
        const { name } = req.body;
        logger.info(`Received request to add new brand ${name}`);
        // Check if brand is already in the database
        if (brandService.isBrandInTable(name)) {
            logger.error(`Brand ${name} is already in the database`);
            return res
                .status(400)
                .json({ error: `${name} is already in the database` });
        }

        // otherwise insert new brand into db
        const newBrand = await brandService.insertNewBrand(name);
        logger.info(
            `Added new brand ${name} with auto-generated ID: ${newBrand.brand_id}`
        );
        res.status(201).json({ brand: `${name}`, id: newBrand.brand_id });
    }
);

// todo: add endpoint for removing a brand?

module.exports = router;
