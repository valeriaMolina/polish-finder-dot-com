/**
 * @author  Valeria Molina Recinos
 */

const userSubmissionModel = require('../models/userSubmissionModel');

async function findUserSubmission(userId, polishId, similarToPolishId) {
    // check if this submiossion already exists in the database
    const userSubmissionQuery = await userSubmissionModel.findOne({
        where: {
            user_id: userId,
            polish_id: polishId,
            similar_to_polish_id: similarToPolishId,
        },
    });
    return userSubmissionQuery;
}

async function findUserSubmissionById(userSubmissionId) {
    const userSubmissionQuery = await userSubmissionModel.findOne({
        where: { submission_id: userSubmissionId },
    });
    return userSubmissionQuery;
}

/**
 * Inserts a new user submission into the database
 * @param {Object} attributes
 * @returns Promise
 **/
async function insertNewUserSubmission(attributes) {
    // assuming it's not in db already
    const newUserSubmission = await userSubmissionModel.create(attributes);
    return newUserSubmission;
}

async function approveUserSubmission(userSubmissionId) {
    const userSubmission = await userSubmissionModel.findOne({
        where: { submission_id: userSubmissionId },
    });
    userSubmission.status = 'approved';
    await userSubmission.save();
    return userSubmission;
}

module.exports = {
    insertNewUserSubmission,
    findUserSubmission,
    findUserSubmissionById,
    approveUserSubmission,
};
