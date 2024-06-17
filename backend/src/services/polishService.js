/**
 * @author  Valeria Molina Recinos
 */

const polishModel = require('../models/polishModel');

/**
 * Inserts a new polish into the database
 * @param {Object} attributes
 * @returns Promise
 */
async function insertNewPolish(attributes) {
    // assuming it's not in db already
    const newPolish = await polishModel.create(attributes);
    return newPolish;
}

module.exports = {
    insertNewPolish,
};
