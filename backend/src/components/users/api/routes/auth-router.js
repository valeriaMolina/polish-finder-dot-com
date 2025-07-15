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
    validateVerifyEmail,
    validateResendVerificationEmail,
    validateResetPassword,
    validateVerifyResetPasswordToken,
    validateResetPasswordToken,
} = require('../middleware/auth-validator');
const logger = require('../../../../libraries/logger/logger');
const userService = require('../../service/user-service');
const authService = require('../../service/auth-service');
const config = require('../../../../libraries/config/config');
const emailService = require('../../service/email-service');
const {
    authenticateToken,
} = require('../../../rbac/api/middleware/rbac-middeware');

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
            sameSite: 'none',
            maxAge: config.refreshTokenExpiration,
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: config.accessTokenExpiration,
        });
        res.json({ userName, userEmail });
    } catch (err) {
        if (err.statusCode) {
            logger.error(`Error authenticating user: ${err.message}`);
            return res
                .status(err.statusCode)
                .send({ error: err.message, errorName: err.name });
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
        const { userName, userEmail, verificationToken } =
            await authService.registerUser(req.body);
        // send confirmation email as well
        await emailService.sendAccountVerificationEmail(
            userEmail,
            userName,
            verificationToken
        );
        res.status(201).json({ userName, userEmail });
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
    const { oldRefreshToken } = req.cookies;
    try {
        logger.info(`Received request to refresh token`);
        // find user by refresh token
        const { accessToken, refreshToken } =
            await authService.refreshTokens(oldRefreshToken);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: config.refreshTokenExpiration,
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: config.accessTokenExpiration,
        });
        res.end();
    } catch (error) {
        if (error.statusCode) {
            logger.error(`Error refreshing token: ${error.message}`);
            return res.status(error.statusCode).send({ error: error.message });
        } else {
            // error was not anticipated
            logger.error(`Error not anticipated: ${error.message}`);
            return res.status(500).send({ error: error.message });
        }
    }
});

router.get('/is-logged-in', authenticateToken, (_, res) => {
    try {
        res.status(200).send();
    } catch (error) {
        if (error.statusCode) {
            logger.error(
                `Error checking if user is logged in: ${error.message}`
            );
            return res.status(error.statusCode).send({ error: error.message });
        } else {
            // error was not anticipated
            logger.error(`Error not anticipated: ${error.message}`);
            return res.status(500).send({ error: error.message });
        }
    }
});

/**
 * Email verification endpoint
 */
router.post('/verify', validateVerifyEmail, async (req, res) => {
    const { token } = req.query;
    try {
        await authService.verifyUser(token);
        return res.status(200).json({ msg: 'User verified' });
    } catch (error) {
        if (error.statusCode) {
            logger.error(`Error verifying user: ${error.message}`);
            return res.status(error.statusCode).send({ error: error.message });
        } else {
            // error was not anticipated
            logger.error(`Error not anticipated: ${error.message}`);
            return res.status(500).send({ error: error.message });
        }
    }
});

/**
 * This function handles the resend verification email process for users.
 * It sends a verification email to the user's registered email address.
 *
 * @param {Object} req - The request object containing the user's email.
 * @param {Object} res - The response object to send back to the client.
 * @param {string} req.body.email - The email of the user.
 *
 * @returns {Promise<void>} Resolves with no value.
 *
 * @throws Will throw an error if there is an issue sending the verification email.
 *
 * @example
 * POST /api/auth/verify/resend
 * Content-Type: application/json
 *
 * {
 *   "email": "user@example.com"
 * }
 *
 * @example
 * HTTP/1.1 200 OK
 * Content-Type: application/json
 *
 * {
 *   "msg": "Verification email sent"
 * }
 */
router.post(
    '/verify/resend',
    validateResendVerificationEmail,
    async (req, res) => {
        const { email } = req.body;
        try {
            await authService.resendVerificationEmail(email);
            return res.status(200).json({ msg: 'Verification email sent' });
        } catch (error) {
            if (error.statusCode) {
                logger.error(
                    `Error resending verification email: ${error.message}`
                );
                return res.status(200).send({ msg: 'Verification email sent' });
            } else {
                // error was not anticipated
                logger.error(`Error not anticipated: ${error.message}`);
                return res.status(500).send({ error: error.message });
            }
        }
    }
);

/**
 * This function handles the password reset process for users.
 * It sends a password reset email to the user's registered email address.
 *
 * @param {Object} req - The request object containing the user's identifier.
 * @param {Object} res - The response object to send back to the client.
 * @param {string} req.body.identifier - The username or email of the user.
 *
 * @returns {Promise<void>} Resolves with no value.
 *
 * @throws Will throw an error if there is an issue sending the password reset email.
 *
 * @example
 * POST /api/auth/send-password-reset-email
 * Content-Type: application/json
 *
 * {
 *   "identifier": "user@example.com"
 * }
 *
 * @example
 * HTTP/1.1 201 Created
 * Content-Type: application/json
 *
 * {
 *   "msg": "Password reset email sent"
 * }
 */
router.post(
    '/send-password-reset-email',
    validateResetPassword,
    async (req, res) => {
        const { identifier } = req.body;
        try {
            const { resetPasswordToken, username, email } =
                await authService.passwordReset(identifier);

            // call email service
            await emailService.sendPasswordResetEmail(
                email,
                username,
                resetPasswordToken
            );
            res.status(201).json({ msg: 'Password reset email sent' });
        } catch (error) {
            if (error.statusCode) {
                logger.error(
                    `Error sending password reset email: ${error.message}`
                );
                return res
                    .status(201)
                    .send({ msg: 'Password reset email sent' });
            } else {
                // error was not anticipated
                logger.error(`Error not anticipated: ${error.message}`);
                return res.status(500).send({ error: error.message });
            }
        }
    }
);

/**
 * This function verifies a reset password token.
 *
 * @param {Object} req - The request object containing the reset password token.
 * @param {Object} res - The response object to send back to the client.
 * @param {string} req.query.token - The reset password token provided by the client.
 *
 * @returns {Promise<void>} Resolves with no value.
 *
 * @throws Will throw an error if the reset password token is invalid or if there is an issue verifying the token.
 *
 * @example
 * GET /api/auth/verify-reset-password-token?token=your_reset_password_token
 *
 * @example
 * HTTP/1.1 200 OK
 * Content-Type: application/json
 *
 * {
 *   "msg": "Token verified"
 * }
 */
router.get(
    '/verify-reset-password-token',
    validateVerifyResetPasswordToken,
    async (req, res) => {
        const { token } = req.query;
        try {
            logger.info(`Received request to verify reset password token`);
            await authService.verifyResetPasswordToken(token);
            res.status(200).json({ msg: 'Token verified' });
        } catch (error) {
            if (error.statusCode) {
                logger.error(
                    `Error verifying reset password token: ${error.message}`
                );
                return res
                    .status(error.statusCode)
                    .send({ error: error.message });
            } else {
                // error was not anticipated
                logger.error(`Error not anticipated: ${error.message}`);
                return res.status(500).send({ error: error.message });
            }
        }
    }
);

/**
 * This function handles the password reset process for users.
 * It updates the user's password and sends a password reset success email.
 *
 * @param {Object} req - The request object containing the reset password token and new password.
 * @param {Object} res - The response object to send back to the client.
 * @param {string} req.params.token - The reset password token provided by the client.
 * @param {string} req.body.newPassword - The new password provided by the client.
 *
 * @returns {Promise<void>} Resolves with no value.
 *
 * @throws Will throw an error if there is an issue resetting the password or sending the success email.
 *
 * @example
 * POST /api/auth/reset-password/:token
 * Content-Type: application/json
 *
 * {
 *   "newPassword": "new_password"
 * }
 *
 * @example
 * HTTP/1.1 200 OK
 */
router.post(
    '/reset-password/:token',
    validateResetPasswordToken,
    async (req, res) => {
        try {
            const { token } = req.params;
            const { newPassword } = req.body;
            logger.info(`Received a request to reset a password`);
            // update user's password
            const userId = await authService.resetUserPassword(
                token,
                newPassword
            );

            // send a password reset success email to user
            await emailService.sendPasswordChangedEmail(userId);
            res.status(201).send();
        } catch (error) {
            if (error.statusCode) {
                logger.error(`Error resetting password: ${error.message}`);
                return res
                    .status(error.statusCode)
                    .send({ error: error.message });
            } else {
                // error was not anticipated
                logger.error(`Error not anticipated: ${error.message}`);
                return res.status(500).send({ error: error.message });
            }
        }
    }
);

/**
 * This functions handles the user logout process.
 * It clears the refresh and access tokens from the client's cookies
 * and logs out the use from the server.
 *
 * @param {Object} req - The request object containing the cookies with the refresh and access tokens.
 * @param {Object} res - The response object to send back to the client.
 * @param {string} req.cookies.refreshToken - The refresh token stored in the client's cookies.
 * @param {string} req.cookies.accessToken - The access token stored in the client's cookies.
 * @returns {Promise<void>} Resolves with no value.
 * @throws Will throw an error if there is an issue logging out the user.
 *
 * @example
 * POST /api/auth/logout
 *
 * @example
 * HTTP/1.1 200 OK
 */
router.post('/logout', async (req, res) => {
    try {
        const { refreshToken, accessToken } = req.cookies;
        logger.info(`Received a request to log out a user`);
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
