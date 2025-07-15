/**
 * @author Valeria Molina Recinos
 */

const logger = require('../../../../libraries/logger/logger');
const colorService = require('../../service/color-service');
const permissions = require('../../../../libraries/constants/permissions');
const {
    validateAttributeInsert,
} = require('../middleware/insert-polish-validator');
const express = require('express');
const router = express.Router();

const {
    authenticateToken,
    authorize,
} = require('../../../rbac/api/middleware/rbac-middeware');

router.post(
    '/new',
    authenticateToken,
    authorize(permissions.UPLOAD_POLISH),
    validateAttributeInsert,
    async (req, res) => {
        try {
            logger.info('POST color/new');
            const newColor = await colorService.newColorInsert(req.body);
            return res.status(201).json(newColor);
        } catch (error) {
            logger.error(`Error adding color: ${error.message}`);
            if (error.statusCode) {
                return res
                    .status(error.statusCode)
                    .send({ error: error.message });
            } else {
                return res.status(500).json({ error: error.message });
            }
        }
    }
);
/**
 * Get all available colors from the database
 */
router.get('/all', async (_, res) => {
    try {
        logger.info('GET colors/all');
        const colors = await colorService.getAllColors();
        return res.json(colors);
    } catch (error) {
        logger.error(`Error getting all colors: ${error.message}`);
        if (error.statusCode) {
            return res.status(error.statusCode).send({ error: error.message });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
