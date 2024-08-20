/**
 * @author Valeria Molina Recinos
 */

const tokens = require('../db/tokens');

async function findTokenByUserId(userId) {
    // finds the token based on the user id
    const token = await tokens.findOne({
        where: { user_id: userId },
    });
    return token;
}

async function deleteTokenByUserId(userId) {
    // deletes the token based on the user id
    await tokens.destroy({
        where: { user_id: userId },
    });
}

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
