/**
 * @author Valeria Molina Recinos
 */

const rolesPermissionsModel = require('../db/roles-permissions');

async function findRolesByRoleId(roleId) {
    // finds the roles based on the role id
    const roles = await rolesPermissionsModel.findAll({
        where: { role_id: roleId },
    });
    return roles;
}

module.exports = {
    findRolesByRoleId,
};
