/**
 * @author Valeria Molina Recinos
 */

const likesModel = require('../db/likes');
const polishesModel = require('../../polish/db/polishes');
const logger = require('../../../libraries/logger/logger');
const {
    UserLikeAlreadyExistsError,
    UserLikeDoesNotExistError,
} = require('../../../libraries/utils/error-handler');

async function createLike(userId, polishId) {
    const like = await likesModel.create({
        user_id: userId,
        polish_id: polishId,
    });
    return like;
}

async function removeLike(userId, polishId) {
    await likesModel.destroy({
        where: { user_id: userId, polish_id: polishId },
    });
}

async function findLikesByUserId(userId) {
    const likes = await likesModel.findAll({
        where: { user_id: userId },
    });
    return likes;
}

async function findLike(userId, polishId) {
    const like = await likesModel.findOne({
        where: { user_id: userId, polish_id: polishId },
    });
    return like;
}

async function likePolish(userId, polishId) {
    try {
        // check if the user already likes this polish
        const likeExists = await findLike(userId, polishId);
        if (likeExists) {
            logger.error('User has already liked this');
            throw new UserLikeAlreadyExistsError('User has already liked this');
        }
        // add like to the database
        logger.info('Adding like to the database');
        const like = await createLike(userId, polishId);
        return like;
    } catch (error) {
        logger.error('Error liking polish', error);
        throw error;
    }
}

async function unlikePolish(userId, polishId) {
    try {
        // see if the polish is in the user likes
        const likeExists = await findLike(userId, polishId);
        if (!likeExists) {
            logger.error('User has not liked this polish');
            throw new UserLikeDoesNotExistError('User has not liked this');
        }

        // remove the like from the database
        await removeLike(userId, polishId);
    } catch (error) {
        logger.error('Error while unliking a polish');
        throw error;
    }
}

module.exports = {
    likePolish,
    unlikePolish,
    findLikesByUserId,
};
