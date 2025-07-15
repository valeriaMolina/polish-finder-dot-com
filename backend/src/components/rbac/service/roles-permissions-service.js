/**
 * @author Valeria Molina Recinos
 */

const rolesPermissionsModel = require('../db/roles-permissions');
const permissions = require('../db/permissions');

async function findPermissionsByRoleId(roleId) {
    // finds the roles based on the role id
    const roles = await rolesPermissionsModel.findAll({
        where: { role_id: roleId },
        include: [
            {
                model: permissions,
                attributes: ['name'],
            },
        ],
    });
    return roles;
}

module.exports = {
    findPermissionsByRoleId,
};
