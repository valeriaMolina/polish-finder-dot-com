/**
 * @author  Valeria Molina Recinos
 * for mods and admins to approve or reject user submissions
 */

const polish = require('../../polish/db/polishes');
const user = require('../../users/db/users');
const dupeSubmissions = require('../db/dupe-submissions');
const Sequelize = require('sequelize');

/**
 * Checks if a dupe submission already exists in the database.
 *
 * @param {number} polishId - The id of the polish.
 * @param {number} similarToPolishId - The id of the polish that the new submission is similar to.
 * @returns {Promise<Object|null>} A promise that resolves to the dupe submission if it exists, or null otherwise.
 *
 * @example
 * checkIfSubmissionExists(123, 456)
 *   .then(dupeExists => {
 *     if (dupeExists) {
 *       console.log('Dupe submission already exists');
 *     } else {
 *       console.log('No dupe submission found');
 *     }
 *   });
 */
async function checkIfSubmissionExists(polishId, similarToPolishId) {
    // check if this submission already exists in the database
    const dupeExists = await dupeSubmissions.findOne({
        where: {
            [Sequelize.Op.or]: [
                {
                    polish_id: polishId,
                    similar_to_polish_id: similarToPolishId,
                },
                {
                    polish_id: similarToPolishId,
                    similar_to_polish_id: polishId,
                },
            ],
        },
    });
    return dupeExists || null;
}

/**
 * Finds a user submission by its id in the database.
 *
 * @param {number} userSubmissionId - The id of the user submission to find.
 * @returns {Promise<Object|null>} A promise that resolves to the user submission if it exists, or null otherwise.
 *
 * @example
 * findUserSubmissionById(123)
 *   .then(userSubmission => {
 *     if (userSubmission) {
 *       console.log('User submission found:', userSubmission);
 *     } else {
 *       console.log('No user submission found with id 123');
 *     }
 *   });
 */
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

/**
 * Updates the status of a dupe submission in the database.
 *
 * @param {Object} dupeSubmission - The dupe submission object to update.
 * @param {string} status - The new status to set for the dupe submission.
 * @returns {Promise<Object>} A promise that resolves to the updated dupe submission.
 *
 * @example
 * const dupeSubmission = await findUserSubmissionById(123);
 * if (dupeSubmission) {
 *   const updatedDupeSubmission = await updateDupeSubmissionStatus(dupeSubmission, 'approved');
 *   console.log('Dupe submission status updated:', updatedDupeSubmission.status);
 * } else {
 *   console.log('No dupe submission found with id 123');
 * }
 */
async function updateDupeSubmissionStatus(dupeSubmission, status) {
    dupeSubmission.status = status;
    await dupeSubmission.save();
    return dupeSubmission;
}

/**
 * Gets all the brand submissions in the db
 * @returns {Promise<Object[]>} A promise that resolves to an array of all dupe submissions.
 */
async function getAllDupeSubmissions() {
    const allDupeSubmissions = await dupeSubmissions.findAll({
        include: [
            {
                model: polish,
                as: 'polish',
                attributes: ['name'],
            },
            {
                model: polish,
                as: 'dupe',
                attributes: ['name'],
            },
            {
                model: user,
                attributes: ['username'],
            },
        ],
    });
    return allDupeSubmissions;
}

module.exports = {
    getAllDupeSubmissions,
    insertNewDupeSubmission,
    checkIfSubmissionExists,
    findUserSubmissionById,
    updateDupeSubmissionStatus,
};
