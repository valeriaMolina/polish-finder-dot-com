/**
 * @author Valeria Molina Recinos
 */

const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { validate } = require('../utils/authValidator');
const logger = require('../config/logger');
const userService = require('../services/userService');

/**
 * This route authenticates the a user
 */
router.post('/auth', validate, async (req, res) => {
    logger.info(`Authenticating user ${req.body.username}`);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        // find user in database
        const user = await userService.getUserId(username);

        if (!user) {
            logger.error(`User ${username} not found`);
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        // todo
        // if user is not found, return error indicating invalid credentials
        // check if the password matches the password in the database
        // if it doesn't match, return error indicating invalid credentials
        res.status(200).json({ msg: 'Authenticated' });
    } catch (err) {
        logger.error(`Error authenticating user: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
