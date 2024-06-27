/**
 * Handles functionality for brand table related queries
 * @author Valeria Molina Recinos
 */

const brands = require('../db/brands');

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
    if (brandQuery) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    findBrandNameInTable,
    insertNewBrand,
    isBrandInTable,
};
