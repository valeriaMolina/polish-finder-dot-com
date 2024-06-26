/**
 * @author Valeria Molina Recinos
 */

const rolesPermissions = require('../models/rolesPermissionsModel');

/**
 * Edits a role by adding a new permission to it.
 *
 * @param {number} roleId - The ID of the role to be edited.
 * @param {number} permissionId - The ID of the permission to be added to the role.
 * @returns {Promise<RolesPermissions>} A promise that resolves to the created role-permission link.
 * @throws Will throw an error if either the role or permission does not exist.
 * @author Valeria Molina Recinos
 */
async function editRole(roleId, permissionId) {
    // assuming both entitities exist
    let linkData = {
        roleId: roleId,
        permissionId: permissionId,
    };

    const r = await rolesPermissions.create(linkData);
    return r;
}

/**
 * Removes a permission from a role.
 *
 * @param {number} roleId - The ID of the role from which the permission will be removed.
 * @param {number} permissionId - The ID of the permission to be removed from the role.
 * @returns {Promise<number>} A promise that resolves to the number of rows affected by the deletion.
 * @throws Will throw an error if either the role or permission does not exist.
 * @author Valeria Molina Recinos
 */
async function removeRole(roleId, permissionId) {
    // assuming both entitities exist
    let linkData = {
        roleId: roleId,
        permissionId: permissionId,
    };

    const r = await rolesPermissions.destroy({
        where: linkData,
    });
    return r;
}

module.exports = {
    editRole,
    removeRole,
};
