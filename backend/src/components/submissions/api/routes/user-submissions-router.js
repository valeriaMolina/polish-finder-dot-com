/**
 * @author Valeria Molina Recinos
 * Handles requests from users to add
 * polishes, brands or dupes to db
 */

const express = require('express');
const router = express.Router();
const logger = require('../../../../libraries/logger/logger');
const permissions = require('../../../../libraries/constants/permissions');
const {
    authenticateToken,
    authorize,
} = require('../../../rbac/api/middleware/rbac-middeware');

const {
    validatePolishSubmission,
    validateBrandSubmission,
    validateDupeSubmission,
    formatPolishSubmission,
} = require('../middleware/submissions-validator');
const {
    submitDupe,
    submitPolish,
    submitBrand,
} = require('../../service/submission-service');

/**
 * Handles requests from users to add polish dupes to db.
 * Only users who have created accounts can perform this action.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {number} req.query.polishId - The id of the polish
 * @param {number} req.query.dupeId - The id of the dupe
 * @param {string} req.body.username - The username of the user
 *
 * @returns {Object} - Returns a JSON object with the new submission or an error message
 */
router.post(
    '/dupe',
    authenticateToken,
    authorize(permissions.UPLOAD_DUPE),
    validateDupeSubmission,
    async (req, res) => {
        try {
            const submit = await submitDupe(req.body);
            res.status(201).json({
                message: `Submission has been created`,
                submissionDetails: submit,
            });
        } catch (err) {
            logger.error(`Error while submitting dupe: ${err.message}`);
            if (err.statusCode) {
                return res.status(err.statusCode).send({ error: err.message });
            } else {
                // error was not anticipated
                logger.error(`Error not anticipated: ${err.message}`);
                return res.status(500).send({ error: err.message });
            }
        }
    }
);

/**
 * Handles requests from users to add polishes to db.
 * TODO: rework this route
 */
router.post(
    '/polish',
    authenticateToken,
    authorize(permissions.UPLOAD_POLISH),
    validatePolishSubmission,
    formatPolishSubmission,
    async (req, res) => {
        try {
            logger.info(`Received a user submission for a new polish`);
            const newPolishInserted = await submitPolish(req.body);
            res.status(201).json(newPolishInserted);
        } catch (err) {
            logger.error(
                `Error while making polish submission: ${err.message}`
            );
            if (err.statusCode) {
                return res.status(err.statusCode).send({ error: err.message });
            } else {
                // error was not anticipated
                logger.error(`Error not anticipated: ${err.message}`);
                return res.status(500).send({ error: err.message });
            }
        }
    }
);

/**
 * Handles requests from users to add brands to db.
 */
router.post(
    '/brand',
    authenticateToken,
    authorize(permissions.UPLOAD_BRAND),
    validateBrandSubmission,
    async (req, res) => {
        try {
            logger.info(`Received a user submission for a new brand`);
            const newBrandRequested = await submitBrand(req.body);
            res.status(201).json(newBrandRequested);
        } catch (err) {
            logger.error(`Error while making brand submission: ${err.message}`);
            if (err.statusCode) {
                return res.status(err.statusCode).send({ error: err.message });
            } else {
                // error was not anticipated
                logger.error(`Error not anticipated: ${err.message}`);
                return res.status(500).send({ error: err.message });
            }
        }
    }
);

module.exports = router;
