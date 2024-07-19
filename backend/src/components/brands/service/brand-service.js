/**
 * Handles functionality for brand table related queries
 * @author Valeria Molina Recinos
 */

const logger = require('../../../libraries/logger/logger');
const brands = require('../db/brands');
const {
    BrandAlreadyExistsError,
} = require('../../../libraries/utils/error-handler');

/**
 * Finds a brand name in table
 * @param {String} name
 * @returns Promise
 */
async function findBrandNameInTable(name) {
    // check for the brand name in the db
    const brandQuery = await brands.findOne({ where: { name: name } });
    return brandQuery;
}

/**
 * Adds a new brand to the table
 * @param {String} name
 * @returns {Promise} model inserted
 */
async function insertNewBrand(name) {
    // assuming it's not in db already
    const newBrand = await brands.create({ name: name });
    return newBrand;
}

/**
 * Checks if a brand name exists in the database.
 *
 * @param {String} name - The name of the brand to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the brand exists, false otherwise.
 *
 * @example
 * // Example usage:
 * isBrandInTable('Apple').then((exists) => {
 *     if (exists) {
 *         console.log('Brand exists in the database.');
 *     } else {
 *         console.log('Brand does not exist in the database.');
 *     }
 * });
 */
async function isBrandInTable(name) {
    const brandQuery = await findBrandNameInTable(name);
    return brandQuery;
}

/**
 * Inserts a new brand into the database.
 *
 * @param {Object} data - The data object containing the brand name.
 * @param {String} data.name - The name of the brand to be inserted.
 *
 * @returns {Promise<Object>} - A promise that resolves to the newly inserted brand model.
 *
 * @throws {BrandAlreadyExists} - If the brand name already exists in the database.
 *
 * @example
 * // Example usage:
 * newBrandInsert({ name: 'Apple' })
 * .then((newBrand) => {
 *     console.log(`Added new brand ${newBrand.name} with auto-generated ID: ${newBrand.brand_id}`);
 * })
 * .catch((error) => {
 *     if (error instanceof BrandAlreadyExists) {
 *         console.error(error.message);
 *     } else {
 *         console.error('An unexpected error occurred:', error);
 *     }
 * });
 */
async function newBrandInsert(data) {
    const { name } = data;
    logger.info(`Received request to add new brand ${name}`);
    // Check if brand is already in database
    const brandExists = await isBrandInTable(name);
    if (brandExists) {
        logger.error(`Brand ${name} already exists in our records`);
        throw new BrandAlreadyExistsError(
            `Brand ${name} already exists in our records`
        );
    }
    // otherwise insert new brand into db
    const newBrand = await insertNewBrand(name);
    logger.info(
        `Added new brand ${name} with auto-generated ID: ${newBrand.brand_id}`
    );
    return newBrand;
}

/**
 * Retrieves all brands from the database.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of brand models.
 *
 * @example
 * // Example usage:
 * getAllBrands()
 * .then((brands) => {
 *     console.log('Retrieved all brands:', brands);
 * })
 * .catch((error) => {
 *     console.error('An unexpected error occurred:', error);
 * });
 */
async function getAllBrands() {
    logger.info('Retrieving all brands');
    const allBrands = await brands.findAll();
    return allBrands;
}

module.exports = {
    findBrandNameInTable,
    insertNewBrand,
    isBrandInTable,
    getAllBrands,
    newBrandInsert,
};
