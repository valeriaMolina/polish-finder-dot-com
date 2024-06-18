/**
 * @author Valeria Molina Recinos
 */

const express = require('express');
const router = express.Router();
const { validateAuth, validateSignup } = require('../utils/authValidator');
const logger = require('../config/logger');
const userService = require('../services/userService');

/**
 * This route authenticates the a user
 */
router.post('/auth', validateAuth, async (req, res) => {
    logger.info(`Authenticating user ${req.body.username}`);
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

/**
 * Validate signup
 */
router.post('/signup', validateSignup, async (req, res) => {
    logger.info(`Received request to create new user`);
    const { username, password, email } = req.body;

    try {
        // check if user already exists
        const existingUser = await userService.getUserByUsername(username);
        if (existingUser) {
            logger.error(`User ${username} already exists`);
            return res.status(400).json({ msg: 'User already exists' });
        }

        const existingUserByEmail = await userService.getUserByEmail(email);
        if (existingUserByEmail) {
            logger.error(`Email ${email} already exists`);
            return res.status(400).json({ msg: 'Email already in use' });
        }

        // create new user
        const user = await userService.createUser(username, email, password);
        res.status(201).json({
            msg: 'User created',
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        logger.error(`Error creating user: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
