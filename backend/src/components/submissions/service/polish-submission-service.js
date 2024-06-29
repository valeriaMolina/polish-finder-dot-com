/**
 * @author Valeria Molina Recinos
 */
// external dependencies
const logger = require('../../../libraries/logger/logger');
const polishSubmissionsModel = require('../db/polish-submissions');

async function insertNewPolishSubmission(attributes) {
    // assuming it's not in db already
    const newSubmission = await polishSubmissionsModel.create(attributes);
    return newSubmission;
}

async function submissionExists(brandId, name) {
    const submissionExists = await polishSubmissionsModel.findOne({
        where: {
            brand_id: brandId,
            name: name,
        },
    });
    return submissionExists;
}

async function findSubmissionById(submissionId) {
    const submission = await polishSubmissionsModel.findOne({
        where: {
            submission_id: submissionId,
        },
    });
    return submission;
}

async function updatePolishSubmissionStatus(polishSubmission, status) {
    polishSubmission.status = status;
    await polishSubmission.save();
    return polishSubmission;
}

module.exports = {
    insertNewPolishSubmission,
    submissionExists,
    findSubmissionById,
    updatePolishSubmissionStatus,
};
