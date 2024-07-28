/**
 * @author  Valeria Molina Recinos
 */

const {
    ColorAlreadyExistsError,
} = require('../../../libraries/utils/error-handler');
const colorModel = require('../db/colors');
const logger = require('../../../libraries/logger/logger');

/**
 * Finds a color by its name in the database.
 *
 * @param {string} name - The name of the color to find.
 * @returns {Promise<Object>} A promise that resolves to the found color object, or null if not found.
 *
 * @example
 * const color = await findColorByName('red');
 * console.log(color); // { id: 1, name: 'red', hex: '#FF0000' }
 *
 * @throws Will throw an error if the database operation fails.
 */
async function findColorByName(name) {
    const color = await colorModel.findOne({ where: { name: name } });
    return color;
}

async function getAllColors() {
    const colors = await colorModel.findAll();
    return colors;
}

async function insertColor(color) {
    const newColor = await colorModel.create(color);
    return newColor;
}

async function newColorInsert(data) {
    const { color } = data;
    logger.info(`Received request to add new color ${color}`);
    // check if color is already in database
    const colorExists = await findColorByName(color);
    if (colorExists) {
        logger.error(`Color ${color} already exists in the database`);
        throw new ColorAlreadyExistsError(
            `Color ${color} already exists in the database`
        );
    }
    // otherwise insert new color
    const newColor = await insertColor(color);
    logger.info(`Successfully added new color ${color}`);
    return newColor;
}

module.exports = {
    findColorByName,
    getAllColors,
    newColorInsert,
};
