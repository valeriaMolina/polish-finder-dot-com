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

/**
 * Finds a color by its id in the database.
 * @param {Number} colorId  - the id of the color to find.
 * @returns {Promise<Object>} A promise that resolves to the found color object, or null if not found.
 */
async function findColorById(colorId) {
    const color = await colorModel.findOne({ where: { color_id: colorId } });
    return color;
}

/**
 * Retrieves all colors from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of color objects.
 * Each color object has the following properties:
 * - id: The unique identifier of the color.
 * - name: The name of the color.
 * - hex: The hexadecimal representation of the color.
 *
 * @example
 * const colors = await getAllColors();
 * console.log(colors); // [ { id: 1, name: 'red', hex: '#FF0000' }, ... ]
 *
 * @throws Will throw an error if the database operation fails.
 */
async function getAllColors() {
    const colors = await colorModel.findAll();
    return colors;
}

/**
 * Inserts a new color into the database.
 *
 * @param {Object} color - The color object to be inserted.
 * @property {string} color.name - The name of the color.
 * @property {string} [color.hex] - The hexadecimal representation of the color.
 *
 * @returns {Promise<Object>} A promise that resolves to the newly created color object.
 * The color object has the following properties:
 * - id: The unique identifier of the color.
 * - name: The name of the color.
 * - hex: The hexadecimal representation of the color.
 *
 * @throws Will throw an error if the database operation fails.
 *
 * @example
 * const newColor = { name: 'blue', hex: '#0000FF' };
 * const insertedColor = await insertColor(newColor);
 * console.log(insertedColor); // { id: 1, name: 'blue', hex: '#0000FF' }
 */
async function insertColor(color) {
    const newColor = await colorModel.create(color);
    return newColor;
}

/**
 * Inserts a new color into the database, after checking if the color does not already exist.
 *
 * @param {Object} data - The data object containing the color name.
 * @property {string} data.name - The name of the color to be inserted.
 *
 * @returns {Promise<Object>} A promise that resolves to the newly created color object.
 * The color object has the following properties:
 * - id: The unique identifier of the color.
 * - name: The name of the color.
 * - hex: The hexadecimal representation of the color (optional).
 *
 * @throws Will throw an error if the color already exists in the database.
 *
 * @example
 * const newColorData = { name: 'blue', hex: '#0000FF' };
 * const insertedColor = await newColorInsert(newColorData);
 * console.log(insertedColor); // { id: 1, name: 'blue', hex: '#0000FF' }
 */
async function newColorInsert(data) {
    const { name } = data;
    // log the request
    logger.info(`Received request to add new color ${name}`);
    // check if color is already in database
    const colorExists = await findColorByName(name);
    if (colorExists) {
        logger.error(`Color ${name} already exists in the database`);
        throw new ColorAlreadyExistsError(
            `Color ${name} already exists in the database`
        );
    }
    // otherwise insert new color
    const color = {
        name: name,
    };
    const newColor = await insertColor(color);
    logger.info(
        `Successfully added new color ${color.name}, id=${newColor.color_id}`
    );
    return newColor;
}

module.exports = {
    findColorById,
    findColorByName,
    getAllColors,
    newColorInsert,
};
