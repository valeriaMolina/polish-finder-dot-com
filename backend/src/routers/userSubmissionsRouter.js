/**
 * @author Valeria Molina Recinos
 * Handles requests from users to add
 * polishes, brands or dupes to db
 */

const express = require('express');
const router = express.Router();
const logger = require('../config/logger');
const permissions = require('../constants/permissions');
const dupeSubmission = require('../models/dupeSubmissions');
const userService = require('../services/userService');
const { validateLinkDupe } = require('../utils/insertPolishValidator');
const {
    authenticateToken,
    authorize,
} = require('../middleware/authMiddleware');

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
    validateLinkDupe,
    async (req, res) => {
        logger.info('Received request to upload new polish dupe');
        // insert submission into user_submissions table
        const { polishId, dupeId } = req.query;
        const { username } = req.body;
        // get the user's id based on the username
        const userId = await userService.getUserId(username);
        if (!userId) {
            return res.status(400).json({ error: 'User not found' });
        }
        // first check if this submission already exists
        const findSubmission = await dupeSubmission.findUserSubmission(
            userId,
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

router.post('/api/requestNewPolish', async (req, res) => {
    logger.info(`Received request for new polish`);
    res.send('ok');
});

router.post('/api/requestNewBrand', async (req, res) => {
    logger.info(`Received request for new brand`);
    res.send('ok');
});

module.exports = router;
