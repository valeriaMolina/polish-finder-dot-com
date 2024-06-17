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

async function findPolishById(id) {
    const polish = await polishModel.findOne({ where: { polish_id: id } });
    return polish;
}

module.exports = {
    insertNewPolish,
    findPolishById,
};
