/**
 * @author Valeria Molina Recinos
 */

const rolesModel = require('../db/roles');

async function findRolesByName(name) {
    const role = await rolesModel.findOne({ where: { name: name } });
    return role;
}

module.exports = {
    findRolesByName,
};
