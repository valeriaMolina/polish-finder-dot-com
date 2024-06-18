/**
 * @author Valeria Molina Recinos
 */

const express = require('express');
const router = express.Router();
const { validate } = require('../utils/authValidator');
const logger = require('../config/logger');
const { validationResult } = require('express-validator');

/**
 * This route authenticates the a user
 */
router.post('/auth', validate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // find user in database
        // todo
        // if user is not found, return error indicating invalid credentials
        // check if the password matches the password in the database
        // if it doesn't match, return error indicating invalid credentials
    } catch (err) {
        logger.error(`Error authenticating user: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
