/**
 * @author Valeria Molina Recinos
 */
const logger = require('../../../../libraries/logger/logger');
const formulaService = require('../../service/formula-service');
const express = require('express');
const router = express.Router();

router.post('/new', async (req, res) => {
    try {
        logger.info(`POST formula/new`);
        const newFormula = await formulaService.newFormulaInsert(req.body);
        return res.status(201).json(newFormula);
    } catch (error) {
        logger.error(`Error adding formula: ${error.message}`);
        if (error.statusCode) {
            return res.status(error.statusCode).send({ error: error.message });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
