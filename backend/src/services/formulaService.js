/**
 * @author  Valeria Molina Recinos
 */

const formulaModel = require('../models/formulaModel');

async function findFormulaByName(name) {
    const formula = await formulaModel.findOne({ where: { name: name } });
    return formula;
}

module.exports = {
    findFormulaByName,
};
