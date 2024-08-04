/**
 * This module contains functions for interacting with the user model.
 * @author  Valeria Molina Recinos
 */

const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const userModel = require('../db/users');
const logger = require('../../../libraries/logger/logger');
const config = require('../../../libraries/config/config');

/**
 * Retrieves a user object by their user ID.
 *
 * @function getUserByUserId
 * @param {number} userId - The user ID to find the user by.
 * @returns {Promise<object|null>} A promise that resolves to the user object if found, or null if not found.
 * @throws Will throw an error if there is a problem with the database connection or query execution.
 *
 * @example
 * const userId = 123;
 * const user = await getUserByUserId(userId);
 * console.log(user); // Output: { user_id: 123, username: 'john_doe', email: 'johndoe@example.com' }
 */
async function getUserByUserId(userId) {
    logger.info(`Finding a user with id: ${userId}`);
    const user = await userModel.findOne({ where: { user_id: userId } });
    return user;
}

/**
 * Retrieves the user ID for a given username.
 *
 * @function getUserId
 * @param {string} username - The username to find the user ID for.
 * @returns {Promise<number|null>} A promise that resolves to the user ID if found, or null if not found.
 * @throws Will throw an error if there is a problem with the database connection or query execution.
 *
 * @example
 * const userId = await getUserId('john_doe');
 * console.log(userId); // Output: 123
 */
async function getUserId(username) {
    logger.info(`Getting user id for ${username}`);
    const user = await userModel.findOne({ where: { username: username } });
    return user;
}

/**
 * Retrieves a user object by their username.
 *
 * @function getUserByUsername
 * @param {string} username - The username to find the user by.
 * @returns {Promise<object|null>} A promise that resolves to the user object if found, or null if not found.
 * @throws Will throw an error if there is a problem with the database connection or query execution.
 *
 * @example
 * const user = await getUserByUsername('john_doe');
 * console.log(user); // Output: { user_id: 123, username: 'john_doe', email: 'johndoe@example.com' }
 */
async function getUserByUsername(username) {
    logger.info(`Finding user by username ${username}`);
    const user = await userModel.findOne({ where: { username: username } });
    return user;
}

/**
 * Retrieves a user object by their email.
 *
 * @function getUserByEmail
 * @param {string} email - The email to find the user by.
 * @returns {Promise<object|null>} A promise that resolves to the user object if found, or null if not found.
 * @throws Will throw an error if there is a problem with the database connection or query execution.
 *
 * @example
 * const user = await getUserByEmail('johndoe@example.com');
 * console.log(user); // Output: { user_id: 123, username: 'john_doe', email: 'johndoe@example.com' }
 */
async function getUserByEmail(email) {
    logger.info(`Finding user by email ${email}`);
    const user = await userModel.findOne({ where: { email: email } });
    return user;
}

/**
 * Retrieves a user object by their username or email.
 *
 * @function getUserByUsernameOrEmail
 * @param {string} identifier - The username or email to find the user by.
 * @returns {Promise<object|null>} A promise that resolves to the user object if found, or null if not found.
 * @throws Will throw an error if there is a problem with the database connection or query execution.
 *
 * @example
 * const user = await getUserByUsernameOrEmail('john_doe');
 * console.log(user); // Output: { user_id: 123, username: 'john_doe', email: 'johndoe@example.com' }
 *
 * @example
 * const user = await getUserByUsernameOrEmail('johndoe@example.com');
 * console.log(user); // Output: { user_id: 123, username: 'john_doe', email: 'johndoe@example.com' }
 */
async function getUserByUsernameOrEmail(identifier) {
    logger.info(`Finding user by username or email ${identifier}`);
    const user = await userModel.findOne({
        where: { [Op.or]: [{ username: identifier }, { email: identifier }] },
    });
    return user;
}

/**
 * Creates a new user in the database.
 *
 * @function createUser
 * @param {string} username - The username of the new user.
 * @param {string} email - The email of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Promise<object>} A promise that resolves to the newly created user object.
 * @throws Will throw an error if there is a problem with the database connection or query execution.
 *
 * @example
 * const newUser = await createUser('john_doe', 'johndoe@example.com', 'password123');
 * console.log(newUser); // Output: { user_id: 123, username: 'john_doe', email: 'johndoe@example.com' }
 */
async function createUser(username, email, password) {
    logger.info(`Creating new user ${username}`);

    const saltRounds = config.saltRounds;
    // hash the password
    const hashedPassword = await bcrypt.hash(password, parseInt(saltRounds));

    // create new user
    const newUser = await userModel.create({
        username: username,
        email: email,
        password_hash: hashedPassword,
    });
    return newUser;
}

/**
 * Saves a refresh token for a given user in the database.
 *
 * @function saveRefreshToken
 * @param {object} user - The user object for which the refresh token needs to be saved.
 * @param {string} refreshToken - The refresh token to be saved for the user.
 * @returns {Promise<void>} A promise that resolves when the refresh token is saved successfully.
 * @throws Will throw an error if there is a problem with the database connection or query execution.
 *
 * @example
 * const user = await getUserByUsername('john_doe');
 * const refreshToken = generateRefreshToken(); // Assume this function exists and generates a refresh token.
 * await saveRefreshToken(user, refreshToken);
 * console.log('Refresh token saved successfully');
 */
async function saveRefreshToken(userId, refreshToken) {
    const user = await userModel.findOne({ where: { user_id: userId } });
    user.refreshtoken = refreshToken;
    await user.save();
}

/**
 * Retrieves a user object by their refresh token.
 *
 * @function getUserByRefreshToken
 * @param {string} refreshToken - The refresh token to find the user by.
 * @returns {Promise<object|null>} A promise that resolves to the user object if found, or null if not found.
 * @throws Will throw an error if there is a problem with the database connection or query execution.
 *
 * @example
 * const refreshToken = 'your_refresh_token';
 * const user = await getUserByRefreshToken(refreshToken);
 * console.log(user); // Output: { user_id: 123, username: 'john_doe', email: 'johndoe@example.com' }
 */
async function getUserByRefreshToken(refreshToken) {
    const user = await userModel.findOne({
        where: { refreshtoken: refreshToken },
    });
    return user;
}

/**
 * Retrieves a user object by their username.
 *
 * @function getUserByUsername
 * @param {string} username - The username to find the user by.
 * @returns {Promise<object|null>} A promise that resolves to the user object if found, or null if not found.
 * @throws Will throw an error if there is a problem with the database connection or query execution.
 *
 * @example
 * const user = await getUserByUsername('john_doe');
 * console.log(user); // Output: { user_id: 123, username: 'john_doe', email: 'johndoe@example.com' }
 */
async function removeRefreshToken(userId) {
    logger.info('Removing refresh token');
    const user = await userModel.findOne({ where: { user_id: userId } });
    user.refreshtoken = null;
    await user.save();
}

module.exports = {
    getUserByUserId,
    getUserId,
    getUserByUsername,
    getUserByEmail,
    createUser,
    getUserByUsernameOrEmail,
    saveRefreshToken,
    getUserByRefreshToken,
    removeRefreshToken,
};
