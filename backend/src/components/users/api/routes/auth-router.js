/**
 * @author Valeria Molina Recinos
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
    validateSignUp,
    validateRefresh,
    decodeBasicAuth,
} = require('../middleware/auth-validator');
const logger = require('../../../../libraries/logger/logger');
const userService = require('../../service/user-service');
const authService = require('../../service/auth-service');
const config = require('../../../../libraries/config/config');
const emailService = require('../../service/email-service');

/**
 * This function authenticates a user.
 *
 * @param {Object} req - The request object containing the user's credentials.
 * @param {Object} res - The response object to send back to the client.
 * @param {string} req.body.identifier - The username or email of the user.
 * @param {string} req.body.password - The password of the user.
 *
 * @returns {void}
 */
router.post('/login', decodeBasicAuth, async (req, res) => {
    logger.info(`Authenticating user...`);
    try {
        const { accessToken, refreshToken, userEmail, userName } =
            await authService.logInUser(req.auth);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: config.refreshTokenExpiration,
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: config.accessTokenExpiration,
        });
        res.json({ userName, userEmail });
    } catch (err) {
        if (err.statusCode) {
            logger.error(`Error authenticating user: ${err.message}`);
            return res.status(err.statusCode).send({ error: err.message });
        } else {
            // error was not anticipated
            logger.error(`Error not anticipated: ${err.message}`);
            return res.status(500).send({ error: err.message });
        }
    }
});

/**
 * This function handles the signup process for new users.
 *
 * @param {Object} req - The request object containing the user's details.
 * @param {Object} res - The response object to send back to the client.
 * @param {string} req.body.username - The username of the new user.
 * @param {string} req.body.password - The password of the new user.
 * @param {string} req.body.email - The email of the new user.
 *
 * @returns {void}
 *
 * @throws Will throw an error if the user already exists or if there is an issue creating the user.
 *
 * @example
 * POST /api/auth/signup
 * Content-Type: application/json
 *
 * {
 *   "username": "new_user",
 *   "password": "new_password",
 *   "email": "new_user@example.com"
 * }
 *
 * @example
 * HTTP/1.1 201 Created
 * Content-Type: application/json
 *
 * {
 *   "msg": "User created",
 *   "username": "new_user",
 *   "email": "new_user@example.com"
 * }
 */
router.post('/signup', validateSignUp, async (req, res) => {
    logger.info(`Received request to create new user`);
    try {
        const { accessToken, refreshToken, userName, userEmail } =
            await authService.registerUser(req.body);
        // send confirmation email as well
        await emailService.sendAccountVerificationEmail(userEmail);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: config.refreshTokenExpiration,
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: config.accessTokenExpiration,
        });
        res.json({ userName, userEmail });
    } catch (error) {
        if (error.statusCode) {
            logger.error(`Error creating new user: ${error.message}`);
            return res.status(error.statusCode).send({ error: error.message });
        } else {
            // error was not anticipated
            logger.error(`Error not anticipated: ${error.message}`);
            return res.status(500).send({ error: error.message });
        }
    }
});

/**
 * This function refreshes the JWT token using the provided refresh token.
 *
 * @param {Object} req - The request object containing the refresh token.
 * @param {Object} res - The response object to send back to the client.
 * @param {string} req.body.refreshToken - The refresh token provided by the client.
 *
 * @returns {void}
 *
 * @throws Will throw an error if the JWT signing process fails.
 *
 * @example
 * POST /api/auth/refresh
 * Content-Type: application/json
 *
 * {
 *   "refreshToken": "your_refresh_token"
 * }
 *
 * @example
 * HTTP/1.1 200 OK
 * Content-Type: application/json
 *
 * {
 *   "token": "your_new_jwt_token"
 * }
 */
router.post('/refresh', validateRefresh, async (req, res) => {
    const { refreshToken } = req.body;
    logger.info(`Received request to refresh token ${refreshToken}`);
    // find user by refresh token
    const user = await userService.getUserByRefreshToken(refreshToken);

    if (!user) {
        logger.error('Invalid refresh token');
        return res.status(400).json({ msg: 'Invalid refresh token' });
    }

    const payload = { user: { id: user.user_id } };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' });
    res.json({ token });
});

router.post('/logout', async (req, res) => {
    try {
        const { refreshToken, accessToken } = req.cookies;
        await authService.logOutUser(refreshToken);
        res.clearCookie('refreshToken', refreshToken);
        res.clearCookie('accessToken', accessToken);
        res.end();
    } catch (error) {
        if (error.statusCode) {
            logger.error(`Error logging out user: ${error.message}`);
            return res.status(error.statusCode).send({ error: error.message });
        } else {
            // error was not anticipated
            logger.error(`Error not anticipated: ${error.message}`);
            return res.status(500).send({ error: error.message });
        }
    }
});

module.exports = router;
