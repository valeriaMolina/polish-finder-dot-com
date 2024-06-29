/**
 * @author Valeria Molina Recinos
 */

const brandSubmissionModel = require('../db/brand-submissions');

async function brandSubmissionExists(brandName) {
    const submission = await brandSubmissionModel.findOne({
        where: { brand_name: brandName },
    });
    return submission;
}

async function insertBrandSubmission(submission) {
    const newSubmission = await brandSubmissionModel.create({
        submission,
    });
    return newSubmission;
}

async function findSubmissionById(submissionId) {
    const submission = await brandSubmissionModel.findOne({
        where: { submission_id: submissionId },
    });
    return submission;
}

async function updateBrandSubmissionStatus(brandSubmission, status) {
    brandSubmission.status = status;
    await brandSubmission.save();
    return brandSubmission;
}

module.exports = {
    brandSubmissionExists,
    insertBrandSubmission,
    findSubmissionById,
    updateBrandSubmissionStatus,
};
