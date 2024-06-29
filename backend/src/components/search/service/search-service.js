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
    search,
};
