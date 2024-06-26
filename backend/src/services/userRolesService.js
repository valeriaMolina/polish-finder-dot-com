/**
 * @author Valeria Molina Recinos
 */

const userRolesModel = require('../models/rbac/userRolesModel');

async function findUserRolesByUserId(userId) {
    // finds the user role based on the user id
    const userRoles = await userRolesModel.findAll({
        where: { user_id: userId },
    });
    return userRoles;
}

async function assignRoleToUser(userId, roleId) {
    // assuming user and role exists
    const newRoleAssignment = await userRolesModel.create({
        user_id: userId,
        role_id: roleId,
    });
    return newRoleAssignment;
}

module.exports = {
    findUserRolesByUserId,
    assignRoleToUser,
};
