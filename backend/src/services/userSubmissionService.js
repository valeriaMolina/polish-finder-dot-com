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

module.exports = {
    insertNewUserSubmission,
    findUserSubmission,
};
