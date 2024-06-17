/**
 * @author  Valeria Molina Recinos
 */

const userModel = require('../models/userModel');
const logger = require('../config/logger');

async function getUserId(username) {
    logger.info(`Getting user id for ${username}`);
    const user = await userModel.findOne({ where: { username: username } });
    if (user) {
        logger.info(`User ID for ${username} found`);
        return user.user_id;
    } else {
        logger.error(`User ${username} not found`);
        return null;
    }
}

module.exports = {
    getUserId,
};
