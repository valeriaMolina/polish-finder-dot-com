/**
 * @author  Valeria Molina Recinos
 */

const logger = require('../../../libraries/logger/logger');
const formulaModel = require('../db/formulas');
const {
    FormulaAlreadyExistsError,
} = require('../../../libraries/utils/error-handler');

/**
 * Finds a formula by its name in the database.
 *
 * @param {string} name - The name of the formula to find.
 * @returns {Promise<Object>} - A Promise that resolves to the found formula object, or null if not found.
 *
 * @example
 * const formula = await findFormulaByName('Example Formula');
 * console.log(formula); // { id: 1, name: 'Example Formula', ... }
 */
async function findFormulaByName(name) {
    const formula = await formulaModel.findOne({ where: { name: name } });
    return formula;
}

/**
 * Finds a formula by its id in the database.
 * @param {*} formulaId
 * @returns
 */
async function findFormulaById(formulaId) {
    const formula = await formulaModel.findOne({
        where: { formula_id: formulaId },
    });
    return formula;
}

async function insertFormula(formula) {
    const newRow = {
        name: formula,
    };
    const newFormula = await formulaModel.create(newRow);
    return newFormula;
}

async function getAllFormulas() {
    const allFormulas = await formulaModel.findAll();
    return allFormulas;
}

async function newFormulaInsert(data) {
    const { formula } = data;
    logger.info(`Received request to add new formula ${formula}`);
    // check if formula is already in database
    const formulaExists = await findFormulaByName(formula);
    if (formulaExists) {
        logger.error(`Brand ${formula} already exists in the database`);
        throw new FormulaAlreadyExistsError(
            `Formula ${formula} already exists in the database`
        );
    }
    // otherwise insert new formula
    const newFormula = await insertFormula(formula);
    logger.info(`Successfully added new formula ${formula}`);
    return newFormula;
}
module.exports = {
    findFormulaByName,
    findFormulaById,
    newFormulaInsert,
    getAllFormulas,
};
