/**
 * @author Valeria Molina Recinos
 */

const polishService = require('../../polish/service/polish-service');
const polishSubmissionService = require('./polish-submission-service');
const brandSubmissionService = require('./brand-submission-service');
const dupeSubmissionService = require('./dupe-submission-service');
const {
    PolishSubmissionNotFoundError,
    PolishSubmissionUpdateStatusError,
    BrandSubmissionNotFoundError,
    BrandSubmissionUpdateStatusError,
    DupeSubmissionNotFoundError,
    DupeSubmissionUpdateStatusError,
} = require('../../../libraries/utils/error-handler');
const logger = require('../../../libraries/logger/logger');

/**
 * Updates the status of a dupe submission in the database.
 *
 * @param {string} submissionId - The unique identifier of the dupe submission.
 * @param {string} status - The new status to update the submission to.
 * @returns {Promise<any>} - A promise that resolves to the updated submission object.
 * @throws {DupeSubmissionNotFoundError} - If the dupe submission with the given id is not found.
 * @throws {DupeSubmissionUpdateStatusError} - If there is an error updating the dupe submission status.
 */
async function updateDupeSubmission(submissionId, status) {
    try {
        // find submissin in database
        const sub =
            await dupeSubmissionService.findUserSubmissionById(submissionId);
        if (!sub) {
            // submission not found, error
            logger.error(`Dupe submission with id ${submissionId} not found.`);
            throw new DupeSubmissionNotFoundError(
                `Dupe submission with id ${submissionId} not found.`
            );
        }
        // update the status
        const update = await dupeSubmissionService.updateDupeSubmissionStatus(
            sub,
            status
        );
        // if the status is approved, then create the dupe link in db
        if (status === 'approved') {
            await polishService.addDupePolishId(
                sub.polish_id,
                sub.similar_to_polish_id
            );
            await polishService.addDupePolishId(
                sub.similar_to_polish_id,
                sub.polish_id
            );
        }
        return update;
    } catch (error) {
        logger.error(
            `Error updating dupe submission with id ${submissionId} : ${error.message}`
        );
        throw new DupeSubmissionUpdateStatusError(error.message);
    }
}

/**
 * Updates the status of a polish submission in the database.
 *
 * @param {string} submissionId - The unique identifier of the polish submission.
 * @param {string} status - The new status to update the submission to.
 * @returns {Promise<any>} - A promise that resolves to the updated submission object.
 * @throws {PolishSubmissionNotFoundError} - If the polish submission with the given id is not found.
 * @throws {PolishSubmissionUpdateStatusError} - If there is an error updating the polish submission status.
 */
async function updatePolishSubmission(submissionId, status) {
    try {
        // Find the submission in the database
        const sub =
            await polishSubmissionService.findSubmissionById(submissionId);
        if (!sub) {
            // submission not found, throw an error
            throw new PolishSubmissionNotFoundError(
                `Submission with id ${submissionId} not found.`
            );
        }
        // update the submission status
        const update =
            await polishSubmissionService.updatePolishSubmissionStatus(
                sub,
                status
            );
        return update;
    } catch (error) {
        logger.error(
            `Error approving polish submission with id ${submissionId} : ${error.message}`
        );
        throw new PolishSubmissionUpdateStatusError(error.message);
    }
}

/**
 * Updates the status of a brand submission in the database.
 *
 * @param {string} submissionId - The unique identifier of the brand submission.
 * @param {string} status - The new status to update the submission to.
 * @returns {Promise<any>} - A promise that resolves to the updated submission object.
 * @throws {BrandSubmissionNotFoundError} - If the brand submission with the given id is not found.
 * @throws {BrandSubmissionUpdateStatusError} - If there is an error updating the brand submission status.
 */
async function updateBrandSubmission(submissionId, status) {
    try {
        // find the submission in the database
        const sub =
            await brandSubmissionService.findSubmissionById(submissionId);
        if (!sub) {
            // submission not found, throw an error
            logger.error(`Brand submission with id ${submissionId} not found.`);
            throw new BrandSubmissionNotFoundError(
                `Brand submission with id ${submissionId} not found.`
            );
        }
        // update the status to be rejected
        const update = await brandSubmissionService.updateBrandSubmissionStatus(
            sub,
            status
        );
        return update;
    } catch (err) {
        logger.error(
            `Error approving brand submission with id ${submissionId} : ${err.message}`
        );
        throw new BrandSubmissionUpdateStatusError(err.message);
    }
}

module.exports = {
    updateDupeSubmission,
    updatePolishSubmission,
    updateBrandSubmission,
};
