/**
 * @author  Valeria Molina Recinos
 * for mods and admins to approve or reject user submissions
 */

const dupeSubmissions = require('../db/dupe-submissions');

async function findDupeSubmission(userId, polishId, similarToPolishId) {
    // check if this submiossion already exists in the database
    const userSubmissionQuery = await dupeSubmissions.findOne({
        where: {
            user_id: userId,
            polish_id: polishId,
            similar_to_polish_id: similarToPolishId,
        },
    });
    return userSubmissionQuery;
}

async function findUserSubmissionById(userSubmissionId) {
    const userSubmissionQuery = await dupeSubmissions.findOne({
        where: { submission_id: userSubmissionId },
    });
    return userSubmissionQuery;
}

/**
 * Inserts a new user submission into the database
 * @param {Object} attributes
 * @returns Promise
 **/
async function insertNewDupeSubmission(attributes) {
    // assuming it's not in db already
    const newUserSubmission = await dupeSubmissions.create(attributes);
    return newUserSubmission;
}

async function approveDupeSubmission(userSubmissionId) {
    const userSubmission = await dupeSubmissions.findOne({
        where: { submission_id: userSubmissionId },
    });
    userSubmission.status = 'approved';
    await userSubmission.save();
    return userSubmission;
}

async function rejectDupeSubmission(userSubmissionId) {
    const userSubmission = await dupeSubmissions.findOne({
        where: { submission_id: userSubmissionId },
    });
    userSubmission.status = 'rejected';
    await userSubmission.save();
    return userSubmission;
}

module.exports = {
    insertNewUserSubmission: insertNewDupeSubmission,
    findUserSubmission: findDupeSubmission,
    findUserSubmissionById,
    approveUserSubmission: approveDupeSubmission,
    rejectUserSubmission: rejectDupeSubmission,
};
