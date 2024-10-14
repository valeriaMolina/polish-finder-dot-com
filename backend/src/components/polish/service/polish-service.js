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
const brands = require('../../brands/db/brands');
const colors = require('../../polish/db/colors');
const type = require('../db/types');

/**
 * Finds all polishes from the database.
 * @param {Number} limit - The maximum number of polishes to return.
 * @param {Number} offset - The number of polishes to skip before returning results.
 * @returns
 */
async function fetchAllPolishes(limit, offset) {
    const allPolishes = await polishModel.findAndCountAll({
        limit,
        offset,
        include: [
            { model: brands, attributes: ['name'] },
            { model: colors, attributes: ['name'] },
            { model: type, attributes: ['name'] },
        ],
    });
    return allPolishes;
}

/**
 * Finds polishes that match the given filters.
 *
 * @param {Object} filters - The filters to use for searching.
 */
async function search(filters) {
    const searchResult = await polishModel.findAll({ where: filters });
    return searchResult;
}

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
    const polish = await polishModel.findOne({
        where: { polish_id: id },
        include: [
            { model: brands, attributes: ['name'] },
            { model: colors, attributes: ['name'] },
            { model: type, attributes: ['name'] },
        ],
    });
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
 *
 * @param {*} polish
 * @returns
 */
async function getPolishInfo(polish) {
    const effectColors = [];
    for (const effectColor of polish.effect_colors) {
        const effectColorInfo = await colorService.findColorById(effectColor);
        effectColors.push(effectColorInfo.name);
    }
    const formulas = [];
    for (const formula of polish.formula_ids) {
        const formulaInfo = await formulaService.findFormulaById(formula);
        formulas.push(formulaInfo.name);
    }
    return {
        effectColors,
        formulas,
    };
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

/**
 * Inserts a new polish into the database based on the provided data.
 * Validates the brand, checks for existing polish, and retrieves IDs for type, colors, and formulas.
 * Builds an attributes object and inserts the new polish into the database.
 *
 * @param {Object} data - The data object containing the necessary information for inserting a new polish.
 * @param {string} data.name - The name of the polish.
 * @param {string} data.brandName - The name of the brand associated with the polish.
 * @param {string} data.type - The type of the polish.
 * @param {string} data.primaryColor - The primary color of the polish.
 * @param {Array<string>} data.effectColors - The effect colors of the polish.
 * @param {Array<string>} data.formulas - The formulas used in the polish.
 * @param {string} data.description - The description of the polish.
 *
 * @returns {Promise<PolishModel>} A promise that resolves to the newly inserted polish model.
 *
 * @throws {BrandNotFoundError} If the provided brand name is not found in the database.
 * @throws {PolishAlreadyExistsError} If a polish with the same name and brand already exists in the database.
 */
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

/**
 * Retrieves a paginated list of polishes from the database.
 *
 * @param {number} page - The page number to retrieve.
 * @param {number} limit - The maximum number of polishes to return per page.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the following properties:
 * - totalItems: The total number of polishes in the database.
 * - totalPages: The total number of pages based on the given limit.
 * - currentPage: The current page number.
 * - polishes: An array of polish objects.
 *
 * @throws {Error} If an error occurs during the database query.
 */
async function getAllPolishes(page, limit) {
    const offset = (page - 1) * limit;
    try {
        const polishes = await fetchAllPolishes(limit, offset);
        return {
            totalItems: polishes.count,
            totalPages: Math.ceil(polishes.count / limit),
            currentPage: page,
            polishes: polishes.rows,
        };
    } catch (error) {
        logger.error(`Error fetching polishes: ${error.message}`);
        throw error;
    }
}

async function findOnePolish(polishId) {
    try {
        const polish = await findPolishById(polishId);
        // get extra information
        const polishInfo = await getPolishInfo(polish);
        // convert the sequelize model to a plain javascript object and return
        return { ...polish.toJSON(), ...polishInfo };
    } catch (error) {
        logger.error(
            `Error fetching polish with id ${polishId}: ${error.message}`
        );
        throw error;
    }
}

module.exports = {
    getPolishInfo,
    fetchAllPolishes,
    insertNewPolish,
    findOnePolish,
    addDupePolishId,
    polishExists,
    newPolishInsert,
    search,
    getAllPolishes,
    findPolishById,
};
