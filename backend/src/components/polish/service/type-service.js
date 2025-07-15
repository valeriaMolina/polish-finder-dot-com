/**
 * @author Valeria Molina Recinos
 */

const typeModel = require('../db/types');
/**
 * @param {string} name
 */
async function findTypeByName(name) {
    // get the id of the type
    const type = await typeModel.findOne({ where: { name: name } });
    return type;
}

async function findTypeById(id) {
    const type = await typeModel.findOne({ where: { type_id: id } });
    return type;
}

module.exports = {
    findTypeByName,
    findTypeById,
};
