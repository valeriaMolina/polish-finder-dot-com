/**
 * @author Valeria Molina Recinos
 */

const express = require('express');
const router = express.Router();
const logger = require('../config/logger');
const polishService = require('../services/polishService');

// Search route
router.get('/api/search/', async (req, res) => {
    // given a polish_id, find the associated dupes to that polish_id
    logger.info(
        `Received request to search for dupes for polish ID: ${req.query.polishId}`
    );
    const matches = [];
    const dupes = await polishService
        .findPolishById(req.query.polishId)
        .then((polish) => polish.dupes);
    if (!dupes) {
        logger.error(`No dupes found for polish ID: ${req.query.polishId}`);
        return res.status(404).json({ message: 'No dupes found' });
    }
    matches.push(...dupes);
    res.status(200).json({ matches });
});

module.exports = router;
