/**
 * @author Valeria Molina Recinos
 */

const tokens = require('../db/tokens');

/**
 * Finds the token based on the user id.
 *
 * @param {number} userId - The id of the user for which to find the token.
 * @returns {Promise<Object>} - A Promise that resolves to the found token object.
 * If no token is found, the Promise resolves to null.
 */
async function findTokenByUserId(userId) {
    // finds the token based on the user id
    const token = await tokens.findOne({
        where: { user_id: userId },
    });
    return token;
}

/**
 * Deletes a token associated with a specific user.
 *
 * @param {number} userId - The id of the user whose token needs to be deleted.
 * @returns {Promise<void>} - A Promise that resolves when the token is successfully deleted.
 * If no token is found for the given user id, the Promise resolves without any action.
 */
async function deleteTokenByUserId(userId) {
    // deletes the token based on the user id
    await tokens.destroy({
        where: { user_id: userId },
    });
}

/**
 * Inserts a new token for a specific user.
 *
 * @param {number} userId - The id of the user for whom to insert the new token.
 * @param {string} token - The token to be inserted for the user.
 * @returns {Promise<void>} - A Promise that resolves when the new token is successfully inserted.
 * If the insertion is successful, the Promise resolves without any action.
 */
async function insertNewToken(userId, token) {
    // inserts a new token for the user
    await tokens.create({
        user_id: userId,
        token_hash: token,
    });
}

module.exports = {
    findTokenByUserId,
    deleteTokenByUserId,
    insertNewToken,
};
