/**
 * @author Valeria Molina Recinos
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../../libraries/config/config');
const userService = require('./user-service');
const userRoleService = require('../../rbac/service/user-roles-service');
const rolesService = require('../../rbac/service/roles-service');
const roles = require('../../../libraries/constants/roles');
const logger = require('../../../libraries/logger/logger');
const {
    UserNotFoundError,
    InvalidCredentialsError,
    UserNameAlreadyInUseError,
    EmailAlreadyInUseError,
    InvalidTokenError,
    UserAlreadyVerifiedError,
} = require('../../../libraries/utils/error-handler');

/**
 * Logs out a user by invalidating their refresh token.
 *
 * @param {string} refreshToken - The user's refresh token.
 *
 * @returns {Promise<void>} - A promise that resolves when the user is successfully logged out.
 * @throws {UserNotFoundError} - If the refresh token is not found in the database.
 */
async function logOutUser(refreshToken) {
    logger.info(`Loggin Out...`);
    // find user by refresh token
    const user = await userService.getUserByRefreshToken(refreshToken);

    if (!user) {
        logger.error(`Invalid refresh token`);
        throw new UserNotFoundError('Invalid refresh token');
    }

    // remove refresh token from database
    await userService.removeRefreshToken(user.user_id);
}

/**
 * Logs in a user by verifying their credentials and generating access and refresh tokens.
 *
 * @param {Object} auth - The user's credentials.
 * @param {string} auth.identifier - The user's username or email.
 * @param {string} auth.password - The user's password.
 *
 * @returns {Promise<Object>} - A promise that resolves to an object containing the access token, refresh token, user's name, and email.
 * @throws {UserNotFoundError} - If the user is not found in the database.
 * @throws {InvalidCredentialsError} - If the provided credentials are invalid.
 */
async function logInUser(auth) {
    const { identifier, password } = auth;
    // find user in database
    const user = await userService.getUserByUsernameOrEmail(identifier);

    if (!user) {
        logger.error(`User ${identifier} not found`);
        throw new UserNotFoundError('User not found');
    }
    // check if the password matches the password in the database
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
        logger.error('Invalid Credentials');
        throw new InvalidCredentialsError('Invalid Credentials');
    }

    // return payload with access token and refresh token
    const payload = {
        user: {
            id: user.user_id,
        },
    };
    const accessToken = jwt.sign(payload, config.jwtSecret, {
        expiresIn: '24h',
    });
    const refreshToken = jwt.sign(payload, config.refreshTokenSecret, {
        expiresIn: '7d',
    });
    // store refresh token in database
    await userService.saveRefreshToken(user.user_id, refreshToken);

    return {
        accessToken,
        refreshToken,
        userName: user.username,
        userEmail: user.email,
    };
}

/**
 * Registers a new user by creating a new user
 * record in the database, hashing the password,
 * assigning a default role to the user, and
 * generating acces and refresh tokens.
 *
 * @param {Object} newUserDetails the details of the new user to be registered
 * @param {string} newUserDetails.username the username of the new user
 * @param {string} newUserDetails.password the password of the new user
 * @param {string} newUserDetails.email the email of the new user
 * @returns {Promise<Object>} - A promise that resolves to an object
 * containing the access token, refresh token, user's name, and email
 *
 * @throws {UserNameAlreadyInUseError} - If the username is already in use
 * @throws {EmailAlreadyInUseError} - If the email is already in use
 * @throws {Error} - If any other error occurs during the registration process
 *
 */
async function registerUser(newUserDetails) {
    const { username, password, email } = newUserDetails;
    try {
        // check if the user already exists
        const userExists = await userService.getUserByUsername(username);
        if (userExists) {
            logger.error(`User ${username} already exists`);
            throw new UserNameAlreadyInUseError('Username already taken');
        }
        // check if the email is already in use
        const emailExists = await userService.getUserByEmail(email);
        if (emailExists) {
            logger.error(`Email ${email} already in use`);
            throw new EmailAlreadyInUseError('Email already in use');
        }

        // otherwise, hash the password and save the user in the database
        const user = await userService.createUser(username, email, password);
        // ASSIGN the user role to this new user as default
        const userRole = await rolesService.findRolesByName(roles.USER);
        const assignRole = await userRoleService.assignRoleToUser(
            user.user_id,
            userRole.role_id
        );
        if (!assignRole) {
            logger.error('Error assigning role to user');
            throw new Error('Error assigning role to user');
        }
        // createa an access token and refresh token and send them back to the client
        const payload = {
            user: {
                id: user.user_id,
            },
        };
        const accessToken = jwt.sign(payload, config.jwtSecret, {
            expiresIn: '24h',
        });
        const refreshToken = jwt.sign(payload, config.refreshTokenSecret, {
            expiresIn: '7d',
        });

        // generate verification token
        const verificationToken = jwt.sign(
            { userId: user.user_id },
            config.jwtSecret,
            { expiresIn: '7d' }
        );

        return {
            accessToken,
            refreshToken,
            userName: user.username,
            userEmail: user.email,
            verificationToken,
        };
    } catch (error) {
        logger.error('Error registering user', error);
        throw error;
    }
}

/**
 * Verifies a user's email by updating the 'email_verified' field in the database.
 *
 * @param {string} token - The JWT token containing the user's ID.
 *
 * @returns {Promise<void>} - A promise that resolves when the user's email is successfully verified.
 * @throws {InvalidTokenError} - If the provided token is invalid.
 * @throws {UserNotFoundError} - If the user with the given ID is not found in the database.
 * @throws {UserAlreadyVerifiedError} - If the user's email has already been verified.
 */
async function verifyUser(token) {
    try {
        // verify the token
        const decoded = jwt.verify(token, config.jwtSecret);

        // find the user and update the email_verified field
        const userId = decoded.user.id;
        if (!userId) {
            logger.error('Invalid token');
            throw new InvalidTokenError('Invalid token');
        }
        const user = await userService.getUserByUserId(userId);

        if (!user) {
            logger.error(`User with id ${userId} not found`);
            throw new UserNotFoundError('User not found');
        }

        // check if the user's email is already verified
        if (user.email_verified) {
            logger.error(`User with id ${userId} has already been verified`);
            throw new UserAlreadyVerifiedError(
                'User has already been verified'
            );
        }

        user.email_verified = true;
        await user.save();
    } catch (error) {
        logger.error('Error verifying user', error);
        throw error;
    }
}

module.exports = {
    logInUser,
    logOutUser,
    registerUser,
    verifyUser,
};
