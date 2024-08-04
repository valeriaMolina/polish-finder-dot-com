/**
 * @author Valeria Molina Recinos
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../../libraries/config/config');
const userService = require('./user-service');
const logger = require('../../../libraries/logger/logger');
const {
    UserNotFoundError,
    InvalidCredentialsError,
} = require('../../../libraries/utils/error-handler');

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

module.exports = {
    logInUser,
    logOutUser,
};
