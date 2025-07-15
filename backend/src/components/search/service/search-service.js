/**
 * @author Valeria Molina Recinos
 */

const { Op } = require('sequelize');
const polishService = require('../../polish/service/polish-service');
const logger = require('../../../libraries/logger/logger');
const brandService = require('../../brands/service/brand-service');
const colorService = require('../../polish/service/color-service');
const typeService = require('../../polish/service/type-service');
const formulaService = require('../../polish/service/formula-service');
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

/**
 * Ensure that the filters provided are valid for searching
 * for a polish
 * @param {JSON} data
 */
async function validateFilters(data) {
    try {
        const searchFilters = {};
        if (data.brandName) {
            const brand = await brandService.findBrandNameInTable(
                data.brandName
            );
            searchFilters.brand = brand.brand_id;
        }

        if (data.type) {
            const type = await typeService.findTypeByName(data.type);
            searchFilters.type_id = type.type_id;
        }

        if (data.primaryColor) {
            const primaryColor = await colorService.findColorByName(
                data.primaryColor
            );
            searchFilters.primary_color = primaryColor.color_id;
        }

        if (data.effectColors) {
            const effectColorIds = await Promise.all(
                data.effectColors.map(async (color) =>
                    colorService.findColorByName(color).then((colorObj) => {
                        if (colorObj) {
                            return colorObj.color_id;
                        } else {
                            return null;
                        }
                    })
                )
            );

            searchFilters.effect_colors = effectColorIds;
        }

        if (data.formulas) {
            const formulaIds = await Promise.all(
                data.formulas.map(async (formula) =>
                    formulaService
                        .findFormulaByName(formula)
                        .then((formula) => {
                            if (formula) {
                                return formula.formula_id;
                            } else {
                                return null;
                            }
                        })
                )
            );
            searchFilters.formula_ids = formulaIds;
            searchFilters.name = data.name;
        }

        return searchFilters;
    } catch (error) {
        logger.error(`Error while validating filters: ${error.message}`);
        throw error;
    }
}

module.exports = {
    searchForDupe,
    search,
    validateFilters,
};
