/**
 * @author  Valeria Molina Recinos
 */

const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const logger = require('../config/logger');
const config = require('../config/config');

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

module.exports = {
    getUserId,
    getUserByUsername,
    getUserByEmail,
    createUser,
};
