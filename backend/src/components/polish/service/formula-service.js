/**
 * @author  Valeria Molina Recinos
 */

const formulaModel = require('../db/formulas');

async function findFormulaByName(name) {
    const formula = await formulaModel.findOne({ where: { name: name } });
    return formula;
}

module.exports = {
    findFormulaByName,
};
