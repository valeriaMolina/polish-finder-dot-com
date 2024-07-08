/**
 * @author Valeria Molina Recinos
 */

const polishService = require('../../polish/service/polish-service');
const logger = require('../../../libraries/logger/logger');
const {
    NoMatchesFoundError,
    PolishNotFoundError,
    SearchError,
} = require('../../../libraries/utils/error-handler');

/**
 * Searches for polishes based on the provided filters.
 *
 * @param {Object} filters - The filters to apply to the search.
 * @returns {Promise<Array>} A promise that resolves to an array of polish objects.
 * @throws {NoMatchesFoundError} If no matches are found for the provided filters.
 * @throws {SearchError} If an error occurs while searching for polishes.
 */
async function search(filters) {
    // search for polishes based on the provided filters
    try {
        const results = await polishService.search(filters);
        if (results.length === 0) {
            logger.error(
                `No matches found for the provided filters: ${JSON.stringify(filters)}`
            );
            throw new NoMatchesFoundError(
                `No matches found for the provided filters: ${JSON.stringify(filters)}`
            );
        }
        return results;
    } catch (err) {
        logger.error(`Error while searching for polishes: ${err.message}`);
        throw new SearchError(
            `Error while searching for polishes: ${err.message}`
        );
    }
}

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
async function searchForDupe(data) {
    try {
        // ensure polish exists
        const polish = await polishService.findPolishById(data.polishId);
        if (!polish) {
            logger.error(
                `Polish with polish_id ${data.polishId} does not exist.`
            );
            throw new PolishNotFoundError(
                `Polish with polish_id ${data.polishId} does not exist.`
            );
        }
        // find the associated dupes to that polish_id
        const dupes = polish.dupes;
        if (dupes.length === 0) {
            logger.error(
                `No dupes associated with polish_id ${data.polishId}.`
            );
            throw new NoMatchesFoundError(
                `No dupes associated with polish_id ${data.polishId}.`
            );
        }
        return dupes;
    } catch (err) {
        logger.error(`Error while searching for dupes: ${err.message}`);
        throw new SearchError(
            `Error while searching for dupes: ${err.message}`
        );
    }
}

module.exports = {
    searchForDupe,
    search,
};
