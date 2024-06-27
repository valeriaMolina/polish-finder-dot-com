/**
 * @author  Valeria Molina Recinos
 */

const polishModel = require('../db/polishes');
const logger = require('../../../libraries/logger/logger');
const { Sequelize } = require('../../../libraries/db/database');
// external dependencies
const typeService = require('../../polish/service/type-service');
const brandService = require('../../brands/service/brand-service');
const colorService = require('../../polish/service/color-service');
const formulaService = require('../../polish/service/formula-service');
const {
    BrandNotFoundError,
    PolishAlreadyExistsError,
} = require('../../../libraries/utils/error-handler');

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

/**
 * Finds a polish by its id in the database.
 *
 * @param {number} id - The id of the polish to find.
 * @returns {Promise<PolishModel|null>} A promise that resolves to the polish model if found, or null if not found.
 * @throws {Error} If an error occurs during the database query.
 */
async function findPolishById(id) {
    const polish = await polishModel.findOne({ where: { polish_id: id } });
    return polish;
}

/**
 * Checks if a polish with the given name and brandId already exists in the database.
 *
 * @param {string} polishName - The name of the polish to check.
 * @param {number} brandId - The id of the brand associated with the polish.
 * @returns {Promise<PolishModel|null>} A promise that resolves to the polish model if found, or null if not found.
 * @throws {Error} If an error occurs during the database query.
 */
async function polishExists(name, brandId) {
    const polish = await polishModel.findOne({
        where: {
            name: name,
            brand_id: brandId,
        },
    });
    return polish;
}

/**
 * Adds a dupe polish id to the polish with the given polishId.
 *
 * @param {number} polishId - The id of the polish to add the dupe to.
 * @param {number} dupeId - The id of the dupe polish to add.
 * @returns {Promise<PolishModel>} A promise that resolves to the updated polish model.
 * @throws {Error} If either the polish with polishId or the polish with dupeId is not found.
 */
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

async function newPolishInsert(data) {
    const {
        name,
        brandName,
        type,
        primaryColor,
        effectColors,
        formulas,
        description,
    } = data;
    // validate brand
    const brand = await brandService.findBrandNameInTable(brandName);
    if (!brand) {
        throw new BrandNotFoundError(`Brand ${brandName} is not in database`);
    }
    // check if this polish exists already
    const existingPolish = await polishExists(name, brand.brand_id);
    if (existingPolish) {
        logger.info(`${name} by ${brandName} is already in the database`);
        throw new PolishAlreadyExistsError(
            `${name} by ${brandName} is already in the database`
        );
    }
    // check for the type
    const typeQuery = await typeService.findTypeByName(type);
    // // check for colors
    const primaryColorQuery = await colorService.findColorByName(primaryColor);
    let effectColorIds = await Promise.all(
        effectColors.map(async (color) =>
            colorService.findColorByName(color).then((color) => color.color_id)
        )
    );
    // check for formulas
    let formulaIds = await Promise.all(
        formulas.map(async (formula) =>
            formulaService
                .findFormulaByName(formula)
                .then((formula) => formula.formula_id)
        )
    );
    // build object to insert into db
    const attributes = {
        brand_id: brand.brand_id,
        type_id: typeQuery.type_id,
        primary_color: primaryColorQuery.color_id,
        effect_colors: effectColorIds,
        formula_ids: formulaIds,
        name: name,
        description: description,
    };
    // INSERT new polish into database
    logger.info(`Adding new polish ${name}`);
    const newPolish = await insertNewPolish(attributes);
    logger.info(
        `Added new polish ${name} with auto-generated ID: ${newPolish.polish_id}`
    );
    return newPolish;
}

module.exports = {
    insertNewPolish,
    findPolishById,
    addDupePolishId,
    polishExists,
    newPolishInsert,
};
