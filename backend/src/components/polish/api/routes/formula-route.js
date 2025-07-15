/**
 * @author Valeria Molina Recinos
 */
const logger = require('../../../../libraries/logger/logger');
const formulaService = require('../../service/formula-service');
const {
    validateAttributeInsert,
} = require('../middleware/insert-polish-validator');
const permissions = require('../../../../libraries/constants/permissions');
const {
    authenticateToken,
    authorize,
} = require('../../../rbac/api/middleware/rbac-middeware');
const express = require('express');
const router = express.Router();

router.post(
    '/new',
    authenticateToken,
    authorize(permissions.UPLOAD_POLISH),
    async (req, res) => {
        try {
            logger.info(`POST formula/new`);
            const newFormula = await formulaService.newFormulaInsert(req.body);
            return res.status(201).json(newFormula);
        } catch (error) {
            logger.error(`Error adding formula: ${error.message}`);
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
 * Get all available formulas from the database
 */
router.get('/all', async (_, res) => {
    try {
        logger.info(`GET formula/all`);
        const allFormulas = await formulaService.getAllFormulas();
        return res.status(200).json(allFormulas);
    } catch (error) {
        logger.error(`Error getting all formulas: ${error.message}`);
        if (error.statusCode) {
            return res.status(error.statusCode).send({ error: error.message });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
