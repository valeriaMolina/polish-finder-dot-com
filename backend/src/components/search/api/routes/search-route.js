/**
 * @author Valeria Molina Recinos
 */

const express = require('express');
const router = express.Router();
const logger = require('../../../../libraries/logger/logger');
const {
    validateDupeSearch,
    validateMatchSearch,
    validateSearch,
} = require('../middleware/search-validator');
const { search } = require('../../service/search-service');

// Search for dupes
// Does not need to be authenticated
router.get('/dupes', validateDupeSearch, async (req, res) => {
    try {
        logger.info(`Finding a match...`);
        const results = await search(req.query);
        res.json(results);
    } catch (err) {
        if (err.statusCode) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message,
            });
        } else {
            logger.error(`Error not anticipated: ${err.message}`);
            res.status(500).json({
                message: `Error not anticipated: ${err.message}`,
            });
        }
    }
});

// search for a polish
// Does not need to be authenticated
router.get('/match', validateMatchSearch, async (req, res) => {
    try {
        logger.info(`Finding a match...`);
        res.send('OK');
    } catch (err) {
        res.status(500).json({
            message: `Error not anticipated: ${err.message}`,
        });
    }
});

// Users can filter polishes by brand, color, formula, etc.
router.get('/', validateSearch, async (req, res) => {
    logger.info(`Received search request: ${JSON.stringify(req.search)}`);
    res.send('OK');
});

module.exports = router;
