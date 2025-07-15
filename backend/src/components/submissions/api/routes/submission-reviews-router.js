/**
 * @author  Valeria Molina Recinos
 * This file contains the routes for updating submission statuses after human review.
 */

const express = require('express');
const router = express.Router();
const permissions = require('../../../../libraries/constants/permissions');
const logger = require('../../../../libraries/logger/logger');
const {
    authenticateToken,
    authorize,
} = require('../../../rbac/api/middleware/rbac-middeware');
const manageSubmissions = require('../../service/manage-submission-service');
const { validateUpdateQuery } = require('../middleware/submissions-validator');
const emailService = require('../../../users/service/email-service');

/**
 * Updates a polish submission status after human review.
 *
 * @param {Object} req - The request object containing the query parameters.
 * @param {Object} res - The response object to send back the updated submission.
 * @returns {void}
 */
router.put(
    '/polish',
    authenticateToken,
    authorize(permissions.MANAGE_POLISH_SUBMISSIONS),
    validateUpdateQuery,
    async (req, res) => {
        // after human review, update the polish submission
        try {
            const { id, status } = req.query;
            logger.info(
                `Received request to update polish submission id: ${id} with status: ${status} `
            );
            const updatedSubmission =
                await manageSubmissions.updatePolishSubmission(id, status);
            res.status(200).json(updatedSubmission);
        } catch (err) {
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
 * Updates a brand submission status after human review.
 *
 * @param {Object} req - The request object containing the query parameters.
 * @param {Object} res - The response object to send back the updated submission.
 * @returns {void}
 */
router.put(
    '/brand',
    authenticateToken,
    authorize(permissions.MANAGE_BRAND_SUBMISSIONS),
    validateUpdateQuery,
    async (req, res) => {
        try {
            const { id, status } = req.query;
            logger.info(
                `Received request to update brand submission id: ${id} with status: ${status} `
            );
            const updatedSubmission =
                await manageSubmissions.updateBrandSubmission(id, status);
            // send an email notification to the user
            const userId = req.body.user.user.id;
            await emailService.sendSubmissionStatusEmail(
                userId,
                'brand',
                status,
                'Brand reviewed'
            );
            res.status(200).json(updatedSubmission);
        } catch (err) {
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
 * Updates a dupe submission status after human review.
 *
 * @param {Object} req - The request object containing the query parameters.
 * @param {Object} res - The response object to send back the updated submission.
 * @returns {void}
 */
router.put(
    '/dupe',
    authenticateToken,
    authorize(permissions.MANAGE_SUBMISSIONS),
    validateUpdateQuery,
    async (req, res) => {
        try {
            const { id, status } = req.query;
            logger.info(
                `Received request to update dupe submission id: ${id} with status: ${status} `
            );
            const updatedSubmission =
                await manageSubmissions.updateDupeSubmission(id, status);
            // send an email notification to the user
            const userId = req.body.user.user.id;
            await emailService.sendSubmissionStatusEmail(
                userId,
                'dupe',
                status,
                `Submission ID: ${id}`
            );
            res.status(200).json(updatedSubmission);
        } catch (err) {
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
