/**
 * @author Valeria Molina Recinos
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../../../libraries/config/config');
const userService = require('./user-service');
const userRoleService = require('../../rbac/service/user-roles-service');
const emailService = require('./email-service');
const tokenService = require('./token-service');
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
    UserNotVerifiedError,
    JsonWebTokenVerifyError,
} = require('../../../libraries/utils/error-handler');

async function invalidateRefreshToken(refreshToken) {
    // find user by refresh token
    const user = await userService.getUserByRefreshToken(refreshToken);

    if (!user) {
        logger.error(`No user had this refresh token`);
        throw new UserNotFoundError(
            'No user associated with this refresh token'
        );
    }

    // remove refresh token from database
    await userService.removeRefreshToken(user.user_id);
}

/**
 * Logs out a user by invalidating their refresh token.
 *
 * @param {string} refreshToken - The user's refresh token.
 *
 * @returns {Promise<void>} - A promise that resolves when the user is successfully logged out.
 * @throws {UserNotFoundError} - If the refresh token is not found in the database.
 */
async function logOutUser(refreshToken) {
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

    // check if the user has already been verified
    // if not, throw an error
    if (!user.email_verified) {
        logger.error('User has not been verified.');
        throw new UserNotVerifiedError('User has not been verified.');
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

        // generate verification token
        const verificationToken = jwt.sign(payload, config.jwtSecret, {
            expiresIn: '7d',
        });

        return {
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
        if (error.message === 'jwt malformed') {
            throw new JsonWebTokenVerifyError(error.message);
        }
        if (error.message === 'jwt expired') {
            throw new InvalidTokenError(error.message);
        }
        throw error;
    }
}

/**
 * Resends a verification email to the user with the provided email.
 *
 * @param {string} email - The user's email.
 * @returns {Promise<void>} - A promise that resolves when the verification email is successfully sent.
 * @throws {UserNotFoundError} - If the user with the given email is not found in the database
 * @throws {Error} - If any other error occurs during the resend process
 * */
async function resendVerificationEmail(email) {
    try {
        // find user by email
        const user = await userService.getUserByEmail(email);

        if (!user) {
            logger.error(`User with email ${email} not found`);
            throw new UserNotFoundError('User not found');
        }

        // check if user's email is already verified
        if (user.email_verified) {
            logger.error(`User with email ${email} has already been verified`);
            throw new UserAlreadyVerifiedError(
                'User has already been verified'
            );
        }

        // generate verification token
        const payload = {
            user: {
                id: user.user_id,
            },
        };

        const newVerificationToken = jwt.sign(payload, config.jwtSecret, {
            expiresIn: '7d',
        });

        // send verification email with new token
        await emailService.sendAccountVerificationEmail(
            user.email,
            user.username,
            newVerificationToken
        );
    } catch (error) {
        logger.error(`Error sending verification email: ${error.message}`);
        throw error;
    }
}

/**
 * Resets a user's password by generating a new reset token,
 * hashing it, and saving it to the database. It also creates a JWT
 * for the password reset process.
 *
 * @param {string} identifier - The user's username or email.
 *
 * @returns {Promise<Object>} - A promise that resolves to an object containing
 * the reset password token, user's username, and email.
 *
 * @throws {UserNotFoundError} - If the user with the given identifier is not found in the database.
 * @throws {Error} - If any other error occurs during the password reset process.
 */
async function passwordReset(identifier) {
    try {
        // find user by username or email
        const user = await userService.getUserByUsernameOrEmail(identifier);

        if (!user) {
            logger.error(`User with identifier ${identifier} not found`);
            throw new UserNotFoundError('User not found');
        }

        // check if there is already a token in place for this user
        const token = await tokenService.findTokenByUserId(user.user_id);
        if (token) {
            // delete the old token
            await tokenService.deleteTokenByUserId(user.user_id);
        }

        const resetToken = crypto.randomBytes(32).toString('hex');

        // create a hash of this token and save into the DB
        const hash = await bcrypt.hash(resetToken, parseInt(config.saltRounds));

        await tokenService.insertNewToken(user.user_id, hash);

        // create a jwt and return
        const payload = {
            user: {
                id: user.user_id,
            },
            resetToken: resetToken,
        };
        const resetPasswordToken = jwt.sign(payload, config.jwtSecret, {
            expiresIn: '1h',
        });
        return {
            resetPasswordToken,
            username: user.username,
            email: user.email,
        };
    } catch (error) {
        logger.error('Error resetting password', error);
        throw error;
    }
}

/**
 * Verifies a reset password token by verifying its signature using the JWT secret.
 *
 * @param {string} token - The JWT token to be verified.
 *
 * @returns {Promise<void>} - A promise that resolves when the token is successfully verified.
 *
 * @throws {JsonWebTokenVerifyError} - If the provided token is invalid or expired.
 *
 * @throws {Error} - If any other error occurs during the verification process.
 */
async function verifyResetPasswordToken(token) {
    try {
        // determine if the token is valid
        jwt.verify(token, config.jwtSecret);
    } catch (error) {
        logger.error('Error verifying reset password token', error);
        if (error.name === 'JsonWebTokenError') {
            throw new JsonWebTokenVerifyError(error.message);
        }
        throw error;
    }
}

async function resetUserPassword(jwtToken, newPassword) {
    try {
        // decode the token
        const decoded = jwt.decode(jwtToken, config.jwtSecret);
        // get the user id and token
        const userId = decoded.user.id;
        const resetToken = decoded.resetToken;

        // find the token by user id
        const token = await tokenService.findTokenByUserId(userId);
        if (!token) {
            logger.error(`No token found`);
            throw new InvalidTokenError('Token not found');
        }

        // check if the token is valid
        const isValid = await bcrypt.compare(resetToken, token.token_hash);

        if (!isValid) {
            logger.error(`Invalid password reset token`);
            throw new InvalidTokenError(
                'Password reset token does not match the stored token'
            );
        }

        // hash the new password
        const hash = await bcrypt.hash(
            newPassword,
            parseInt(config.saltRounds)
        );

        // update the user's password in the database
        await userService.updateUserPassword(userId, hash);

        // delete the token from the database
        await tokenService.deleteTokenByUserId(userId);

        return userId;
    } catch (error) {
        logger.error(`Error decoding token error: ${error}`);
        if (error.name === 'JsonWebTokenError') {
            throw new JsonWebTokenVerifyError(error.message);
        }
        throw error;
    }
}

async function refreshTokens(refreshToken) {
    try {
        const decoded = jwt.verify(refreshToken, config.refreshTokenSecret);
        const userId = decoded.user.id;
        if (!userId) {
            throw new UserNotFoundError('User not found');
        }

        // invalidate the old refresh token
        await invalidateRefreshToken(refreshToken);

        // generate new tokens
        const payload = {
            user: {
                id: userId,
            },
        };
        const newAccessToken = jwt.sign(payload, config.jwtSecret, {
            expiresIn: '24h',
        });
        const newRefreshToken = jwt.sign(payload, config.refreshTokenSecret, {
            expiresIn: '7d',
        });
        // save the new refresh token
        await userService.saveRefreshToken(userId, newRefreshToken);

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
        logger.error(`Error refreshing tokens: ${error.message}`);
        throw new InvalidTokenError('Invalid refresh token');
    }
}

module.exports = {
    logInUser,
    logOutUser,
    registerUser,
    verifyUser,
    resendVerificationEmail,
    passwordReset,
    verifyResetPasswordToken,
    resetUserPassword,
    refreshTokens,
};
