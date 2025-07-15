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
 * A POST route responsible for inserting a new polish into the database.
 *
 * This route is protected by the `authorize` middleware, which checks if the user has the permissions to perform the action
 * and returns the status of the upload
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

module.exports = router;
