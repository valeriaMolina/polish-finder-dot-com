/**
 * @author Valeria Molina Recinos
 */

const {
    check,
    validationResult,
    cookie,
    query,
    param,
    body,
} = require('express-validator');
const jwt = require('jsonwebtoken');
const base64 = require('base-64');
const config = require('../../../../libraries/config/config');
const logger = require('../../../../libraries/logger/logger');

exports.validateSignUp = [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    /**
     * Middleware function to validate the request body for the reset password endpoint.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function in the stack.
     *
     * @returns {void} If validation passes, calls the next middleware function.
     *                  If validation fails, returns a 400 status code with an array of errors.
     */
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

exports.validateRefresh = [
    cookie('refreshToken', 'Refresh token is required').not().isEmpty(),
    /**
     * Middleware function to validate the request body for the reset password endpoint.
     * @param {Object} req - the request object. Contains the request data sent by the client
     * @param {Object} res - The response object. Used to send a response back to the client
     * @param {Function} next - The next middleware function in the stack. Called when the current middleware
     * function finishes.
     * @returns {void} If validation passes, calls the next middleware function.
     */
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const refreshToken = req.cookies.refreshToken;
            logger.info(`Verifying refresh token`);
            // verify the refresh token
            jwt.verify(refreshToken, config.refreshTokenSecret);
            logger.info('Refresh token verified');
            req.cookies.oldRefreshToken = refreshToken;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                logger.error(`Refresh token expired: ${error.message}`);
                return res.status(401).json({
                    error: 'Refresh token expired',
                    name: 'TokenExpiredError',
                });
            } else if (error.name === 'JsonWebTokenError') {
                logger.error(`Invalid refresh token: ${error.message}`);
                return res.status(403).json({
                    error: 'Forbidden: invalid refresh token',
                    name: 'JsonWebTokenError',
                });
            } else {
                logger.error(`Error verifying refresh token: ${error.message}`);
                return res
                    .status(403)
                    .json({ error: 'Forbidden', name: 'Forbidden' });
            }
        }
    },
];

exports.validateResetPassword = [
    check('identifier', 'identifier is required').not().isEmpty(),
    /**
     * Middleware function to validate the request body for the reset password endpoint.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function in the stack.
     *
     * @returns {void} If validation passes, calls the next middleware function.
     *                  If validation fails, returns a 400 status code with an array of errors.
     */
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Decodes the Basic Authentication header and extracts the identifier
 * and password from the Basic Authentication header.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.decodeBasicAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader?.startsWith('Basic ')) {
        return res
            .status(401)
            .json({ message: 'Missing or invalid Authorization header' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = base64.decode(base64Credentials).split(':');
    const [identifier, password] = credentials;

    req.auth = { identifier, password };
    next();
};

/**
 * Middleware function to validate the request body for verifying the email.
 * @param {Array} middleware - An array containing the express-validator middleware and custom validation logic.
 * @param {Object} middleware[0] - The express-validator middleware function for checking the 'token' field.
 * @param {Function} middleware[1] - Custom middleware function for validating the request body.
 * @param {Object} req - The request object. Contains the request data sent by the client.
 * @param {Object} req.body - The request body containing the 'token' field.
 * @param {string} req.body.token - The verification token sent to the user's email.
 * @param {Object} res - The response object. Used to send a response back to the client.
 * @param {Function} next - The next middleware function in the stack. Called when the current middleware
 * function finishes.
 * @returns {void} If validation passes, calls the next middleware function.
 */
exports.validateVerifyEmail = [
    check('token', 'Token is required').not().isEmpty(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Middleware function to validate the request body for resending the verification email.
 *
 * @param {Array} middleware - An array containing the express-validator middleware and custom validation logic.
 * @param {Object} middleware[0] - The express-validator middleware function for checking the 'email' field.
 * @param {Function} middleware[1] - Custom middleware function for validating the request body.
 *
 * @param {Object} req - The request object. Contains the request data sent by the client.
 * @param {Object} req.body - The request body containing the 'email' field.
 * @param {string} req.body.email - The email address to be verified.
 *
 * @param {Object} res - The response object. Used to send a response back to the client.
 *
 * @param {Function} next - The next middleware function in the stack. Called when the current middleware
 * function finishes.
 *
 * @returns {void} If validation passes, calls the next middleware function.
 *                  If validation fails, returns a 400 status code with an array of errors.
 */
exports.validateResendVerificationEmail = [
    check('email', 'Email is required').isEmail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Middleware function to validate the request body for the verify reset password token endpoint.
 */
exports.validateVerifyResetPasswordToken = [
    query('token', 'Token is required').isString().not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Middleware function to validate the request body for the reset password endpoint.
 */
exports.validateResetPasswordToken = [
    param('token', 'Token is required').not().isEmpty(),
    body('newPassword').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
