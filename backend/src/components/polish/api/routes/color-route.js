/**
 * @author Valeria Molina Recinos
 */

const logger = require('../../../../libraries/logger/logger');
const colorService = require('../../service/color-service');
const express = require('express');
const router = express.Router();

router.post('/new', async (req, res) => {
    try {
        logger.info('POST color/new');
        const newColor = await colorService.newColorInsert(req.body);
        return res.status(201).json(newColor);
    } catch (error) {
        logger.error(`Error adding color: ${error.message}`);
        if (error.statusCode) {
            return res.status(error.statusCode).send({ error: error.message });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;
