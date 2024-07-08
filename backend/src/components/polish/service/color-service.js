/**
 * @author  Valeria Molina Recinos
 */

const colorModel = require('../db/colors');

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

module.exports = {
    findColorByName,
};
