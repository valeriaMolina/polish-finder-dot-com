/**
 * @author Valeria Molina Recinos
 * Handles requests from users to add
 * polishes, brands or dupes to db
 */

const express = require('express');
const router = express.Router();
const logger = require('../../../../libraries/logger/logger');
const permissions = require('../../../../libraries/constants/permissions');
const dupeSubmissionService = require('../../service/dupe-submission-service');
const polishSubmissionService = require('../../service/polish-submission-service');
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
    '/api/linkDupe',
    authenticateToken,
    authorize(permissions.UPLOAD_DUPE),
    validateDupeSubmission,
    async (req, res) => {
        logger.info('Received request to upload new polish dupe');
        // insert submission into polish_submissions table
        const { polishId, dupeId } = req.query;
        const user = req.body.user;
        const id = user.user.id;
        // first check if this submission already exists
        const findSubmission = await dupeSubmissionService.findUserSubmission(
            id,
            polishId,
            dupeId
        );
        if (findSubmission) {
            logger.error(
                `User ${username} has ALREADY submitted dupe ${dupeId} for polish ${polishId}`
            );
            return res.status(400).json({
                error: 'Duplicate submission. Please wait for admin approval',
            });
        }
        // check that both polishes are already in the database
        // todo
        const submission = {
            user_id: userId,
            polish_id: polishId,
            similar_to_polish_id: dupeId,
        };
        const newSubmission =
            await dupeSubmission.insertNewUserSubmission(submission);
        res.status(201).json({ submission: newSubmission });
    }
);

/**
 * Handles requests from users to add polishes to db.
 */
router.post(
    '/api/requestNewPolish',
    authenticateToken,
    authorize(permissions.UPLOAD_POLISH),
    validatePolishSubmission,
    formatPolishSubmission,
    async (req, res) => {
        logger.info(`Received request for adding new polish`);
        // insert submission into polish_submissions table
        const user = req.body.user;
        const id = user.user.id;
        const submission = req.body.submission;
        submission.user_id = id;
        // add polish to polish submission
        try {
            const polishSubmission =
                await polishSubmissionService.insertNewPolishSubmission(
                    submission
                );
            res.status(201).json({ submission: polishSubmission });
        } catch (err) {
            logger.error(err);
            return res.status(500).json({
                error: 'Internal Server Error',
                msg: err.message,
            });
        }
    }
);

/**
 * Handles requests from users to add brands to db.
 */
router.post('/api/requestNewBrand', authenticateToken, async (req, res) => {
    logger.info(`Received request for new brand`);
    // todo
    res.send('ok');
});

module.exports = router;
