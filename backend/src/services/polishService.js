/**
 * @author  Valeria Molina Recinos
 */

const polishModel = require('../models/polishModel');
const logger = require('../config/logger');
const { Sequelize } = require('../config/database');

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

async function addDupePolishId(polishId, dupeId) {
    // get the current dupe array for this polishId
    const polish = await findPolishById(polishId);
    if (!polish) {
        logger.error(`Polish with id ${polishId} not found`);
        throw new Error(`Polish with id ${polishId} not found`);
    }
    // also find the polish with the dupeId
    const dupePolish = await findPolishById(dupeId);
    if (!dupePolish) {
        logger.error(`Polish with id ${dupeId} not found`);
        throw new Error(`Polish with id ${dupeId} not found`);
    }
    const updatedPolish = await polishModel.update(
        {
            dupes: Sequelize.fn(
                'array_append',
                Sequelize.col('dupes'),
                dupePolish.polish_id
            ),
        },
        {
            where: {
                polish_id: polishId,
            },
        }
    );
    return updatedPolish;
}

module.exports = {
    insertNewPolish,
    findPolishById,
    addDupePolishId,
};
