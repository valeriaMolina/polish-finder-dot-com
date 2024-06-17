/**
 * Handles functionality for brand table related queries
 * @author Valeria Molina Recinos
 */

const brands = require('../models/brandModel');

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

module.exports = {
    findBrandNameInTable,
    insertNewBrand,
};
