/**
 * @author Valeria Molina Recinos
 */

const polishService = require('../../polish/service/polish-service');
const {
    NoMatchesFoundError,
} = require('../../../libraries/utils/error-handler');
/**
 * Searches for the associated dupes to a given polish_id.
 *
 * @param {Object} data - The input data object.
 * @param {string} data.polishId - The polish_id to search for.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of dupe objects.
 *
 * @throws Will throw an error if there are no dupes found.
 */
async function search(data) {
    // given a polish_id, find the associated dupes to that polish_id
    const results = await polishService
        .findPolishById(data.polishId)
        .then((polish) => polish.dupes);
    if (!results) {
        logger.error(`There are no dupes.`);
        throw new NoMatchesFoundError('There are no matches.');
    }
    return results;
}

module.exports = {
    search,
};
