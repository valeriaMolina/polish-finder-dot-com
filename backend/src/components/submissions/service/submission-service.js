/**
 * @author Valeria Molina Recinos
 */

const dupeSubmissionService = require('../service/dupe-submission-service');
const brandSubmissionService = require('./brand-submission-service');
const polishSubmissionService = require('./polish-submission-service');
const {
    UserAlreadySubmittedDupeError,
    DupeAlreadySubmitterError,
    DupeSubmissionError,
    BrandNotFoundError,
    PolishAlreadyExistsError,
    UserAlreadySubmittedPolishError,
    PolishAlreadySubmittedError,
    BrandAlreadyExistsError,
    BrandAlreadySubmittedError,
    BrandSubmissionError,
    PolishSubmissionError,
    UnableToUpdateSubmissionError,
} = require('../../../libraries/utils/error-handler');
const logger = require('../../../libraries/logger/logger');
const polishService = require('../../polish/service/polish-service');
const brandService = require('../../brands/service/brand-service');
const uploadService = require('../../../libraries/config/file-upload');
const { submissionExists } = require('../service/polish-submission-service');

/**
 * Submits a dupe for a specific polish.
 *
 * @param {Object} data - The data object containing the necessary parameters.
 * @param {number} data.polishId - The ID of the polish for which the dupe is being submitted.
 * @param {number} data.dupeId - The ID of the dupe being submitted.
 * @param {Object} data.user - The user object containing the user's information.
 * @param {number} data.user.id - The ID of the user making the submission.
 *
 * @throws {UserAlreadySubmittedDupeError} If the user has already submitted this dupe.
 * @throws {DupeAlreadySubmitterError} If someone else has already requested this dupe.
 * @throws {DupeSubmissionError} If an error occurs while submitting the dupe.
 *
 * @returns {Promise<Object>} A promise that resolves to the newly created dupe submission object.
 */
async function submitDupe(data) {
    const { polishId, dupeId } = data;
    const user = data.user;
    const id = user.user.id;
    // check if there's already a submission pending for this dupe
    try {
        const submissionExists =
            await dupeSubmissionService.checkIfSubmissionExists(
                polishId,
                dupeId
            );
        if (submissionExists) {
            // check if the same user already made this submission
            if (submissionExists.user_id === id) {
                // remind user that they already submitted this dupe
                throw new UserAlreadySubmittedDupeError(
                    `You have already submitted this dupe. Current Status: ${submissionExists.status}`
                );
            } else {
                // tell user that someone else already requested this dupe
                throw new DupeAlreadySubmitterError(
                    `Someone else has already requested this dupe. Current Status: ${submissionExists.status}`
                );
            }
        } else {
            // create new submission
            logger.info(
                `New dupe submission for polish id: ${polishId}, dupe id: ${dupeId}`
            );
            const newSubmission =
                await dupeSubmissionService.insertNewDupeSubmission({
                    user_id: id,
                    polish_id: polishId,
                    similar_to_polish_id: dupeId,
                });
            return newSubmission;
        }
    } catch (err) {
        logger.error(`Error while submitting dupe: ${err.message}`);
        throw new DupeSubmissionError(err.message);
    }
}

/**
 * Submits a polish for a specific brand.
 *
 * @param {Object} data - The data object containing the necessary parameters.
 * @param {string} data.brandName - The name of the brand for which the polish is being submitted.
 * @param {string} data.name - The name of the polish being submitted.
 * @param {Object} data.user - The user object containing the user's information.
 * @param {number} data.user.id - The ID of the user making the submission.
 * @param {Object} data.submission - The submission object containing additional information.
 *
 * @throws {BrandNotFoundError} If the brand does not exist in the records.
 * @throws {PolishAlreadyExistsError} If the polish already exists in the records.
 * @throws {PolishAlreadySubmittedError} If someone else has already submitted this polish.
 * @throws {UserAlreadySubmittedPolishError} If the user has already submitted this polish.
 * @throws {PolishSubmissionError} If an error occurs while submitting the polish.
 *
 * @returns {Promise<Object>} A promise that resolves to the newly created polish submission object.
 */
async function submitPolish(data) {
    const { brandName, name } = data;
    const user = data.user;
    const id = user.user.id;
    try {
        // first check if the brand exists
        const brandExists = await brandService.findBrandNameInTable(brandName);
        if (!brandExists) {
            logger.error(
                `The brand ${brandName} does not exist in our records`
            );
            throw new BrandNotFoundError(
                `The brand ${brandName} does not exist in our records`
            );
        }
        // check if the polish already exists
        const polishExists = await polishService.polishExists(
            name,
            brandExists.brand_id
        );
        if (polishExists) {
            logger.error(
                `Polish ${name} from ${brandName} already exists in our records`
            );
            throw new PolishAlreadyExistsError(
                `Polish ${name} from ${brandName} already exists in our records`
            );
        }
        // check if there is already a submission for this polish
        const submissionExistsAlready = await submissionExists(
            brandExists.brand_id,
            name
        );
        if (submissionExistsAlready) {
            logger.error(`There is already a submission for this polish`);
            if (submissionExistsAlready.user_id === id) {
                logger.error(
                    `User has already submitted this polish. Current Status: ${submissionExistsAlready.status}`
                );
                throw new UserAlreadySubmittedPolishError(
                    `User has already submitted this polish. Current Status: ${submissionExistsAlready.status}`
                );
            } else {
                logger.error(
                    `Someone else already submitted this polish. Status: ${brandExists.status}`
                );
                throw new PolishAlreadySubmittedError(
                    `Someone else already submitted this polish. Status: ${brandExists.status}`
                );
            }
        }
        const submission = data.submission;
        submission.user_id = id;
        // create new submission
        const newSubmission =
            await polishSubmissionService.insertNewPolishSubmission(submission);

        return newSubmission;
    } catch (err) {
        logger.error(`Error while submitting polish: ${err.message}`);
        throw new PolishSubmissionError(err.message);
    }
}

/**
 * Updates a polish submission of the specified submission id with a url to an image
 * @param {*} submissionId
 * @param {*} imageUrl
 * @returns the updated submission
 */
async function addImageUrlToPolishSubmissions(submissionId, imageUrl) {
    try {
        const updatedSub =
            await polishSubmissionService.addImageUrlToPolishSubmissions(
                submissionId,
                imageUrl
            );
        logger.info(
            `Image URL '${imageUrl}' added to submission '${submissionId}'`
        );
        return updatedSub;
    } catch (err) {
        throw new UnableToUpdateSubmissionError(err.message);
    }
}

/**
 * Submits a brand for addition to the database.
 *
 * @param {Object} data - The data object containing the necessary parameters.
 * @param {string} data.name - The name of the brand being submitted.
 * @param {Object} data.user - The user object containing the user's information.
 * @param {number} data.user.id - The ID of the user making the submission.
 *
 * @throws {BrandAlreadyExistsError} If the brand already exists in the records.
 * @throws {BrandAlreadySubmittedError} If someone else has already submitted this brand.
 * @throws {UserAlreadySubmittedBrandError} If the user has already submitted this brand.
 * @throws {BrandSubmissionError} If an error occurs while submitting the brand.
 *
 * @returns {Promise<Object>} A promise that resolves to the newly created brand submission object.
 */
async function submitBrand(data) {
    const { brandName, brandUrl } = data;
    const user = data.user;
    const id = user.user.id;
    // check if the brand already exists
    try {
        const brandExists = await brandService.findBrandNameInTable(brandName);
        if (brandExists) {
            logger.error(`Brand ${brandName} already exists in our records`);
            throw new BrandAlreadyExistsError('SubmissionAlreadyExists');
        }
        // check if there is already a submission for this brand
        const submissionExistsAlready =
            await brandSubmissionService.brandSubmissionExists(brandName);
        if (submissionExistsAlready) {
            logger.error(`Submission already exists for brand ${brandName}`);
            throw new BrandAlreadySubmittedError('SubmissionDuplicate');
        }
        // create new submission
        const submission = await brandSubmissionService.insertBrandSubmission({
            user_id: id,
            brand_name: brandName,
            website: brandUrl,
        });
        return submission;
    } catch (err) {
        logger.error(`Error while submitting brand: ${err.message}`);
        throw new BrandSubmissionError(err.message);
    }
}

module.exports = {
    submitDupe,
    submitPolish,
    submitBrand,
    addImageUrlToPolishSubmissions,
};
