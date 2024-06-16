/**
 * @author Valeria Molina Recinos
 */

const express = require('express');
const router = express.Router();

// Search route
router.get('/api/search', (req, res) => {
    // logic for searching dupes
    res.send('Searching...');
});

module.exports = router;
