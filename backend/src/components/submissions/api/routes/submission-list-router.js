/**
 * @author Valeria Molina Recinos
 */

const express = require('express');
const router = express.Router();
const logger = require('../../../../libraries/logger/logger');
const dupeSubmissionService = require('../../service/dupe-submission-service');
const brandSubmissionService = require('../../service/brand-submission-service');
const polishSubmissionService = require('../../service/polish-submission-service');
const {
    authenticateToken,
    authorize,
} = require('../../../rbac/api/middleware/rbac-middeware');
const permissions = require('../../../../libraries/constants/permissions');

router.get(
    '/dupes',
    authenticateToken,
    authorize(permissions.MANAGE_SUBMISSIONS),
    async (_, res) => {
        try {
            logger.info('Received request to display dupe submissions');
            const submissions =
                await dupeSubmissionService.getAllDupeSubmissions();
            return res.json(submissions);
        } catch (error) {
            if (error.statusCode) {
                return res
                    .status(error.statusCode)
                    .send({ error: error.message });
            } else {
                // error was not anticipated
                logger.error(`Error not anticipated: ${error.message}`);
                return res.status(500).send({ error: error.message });
            }
        }
    }
);

router.get(
    '/brands',
    authenticateToken,
    authorize(permissions.MANAGE_BRAND_SUBMISSIONS),
    async (_, res) => {
        try {
            logger.info(`Received request to display brand submissions`);
            const submissions =
                await brandSubmissionService.getAllSubmissions();
            return res.json(submissions);
        } catch (error) {
            if (error.statusCode) {
                return res
                    .status(error.statusCode)
                    .send({ error: error.message });
            } else {
                // error was not anticipated
                logger.error(`Error not anticipated: ${error.message}`);
                return res.status(500).send({ error: error.message });
            }
        }
    }
);

router.get(
    '/polish',
    authenticateToken,
    authorize(permissions.MANAGE_SUBMISSIONS),
    async (_, res) => {
        try {
            logger.info(`Received request to display polish submissions`);
            const submissions =
                await polishSubmissionService.getAllPolishSubmissions();
            return res.json(submissions);
        } catch (error) {
            if (error.statusCode) {
                return res
                    .status(error.statusCode)
                    .send({ error: error.message, name: error.name });
            } else {
                // error was not anticipated
                logger.error(`Error not anticipated: ${error.message}`);
                return res.status(500).send({
                    error: error.message,
                    name: 'ErrorNotAnticipated',
                });
            }
        }
    }
);

module.exports = router;
