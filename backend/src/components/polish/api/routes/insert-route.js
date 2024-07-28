/**
 * @author Valeria Molina Recinos
 */

const logger = require('../../../../libraries/logger/logger');
const router = require('express').Router();
const polishService = require('../../../polish/service/polish-service');
const permissions = require('../../../../libraries/constants/permissions');

const {
    validateInsertPolish,
} = require('../middleware/insert-polish-validator');
const {
    authenticateToken,
    authorize,
} = require('../../../rbac/api/middleware/rbac-middeware');

/**
 * Handles the POST request to upload a new polish.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {void}
 */
router.post(
    '/new',
    authenticateToken,
    authorize(permissions.UPLOAD_POLISH),
    validateInsertPolish,
    async (req, res) => {
        try {
            logger.info(`Received request to insert new polish`);
            const newPolish = await polishService.newPolishInsert(req.body);
            res.status(201).json(newPolish);
        } catch (err) {
            logger.error(`Error while inserting new polish: ${err.message}`);
            if (err.statusCode) {
                return res.status(err.statusCode).send({ error: err.message });
            } else {
                // error was not anticipated
                return res.status(500).send({ error: err.message });
            }
        }
    }
);

// TODO: add route to modify/update an existing polish

// TODO: add route to link a dupe

module.exports = router;
