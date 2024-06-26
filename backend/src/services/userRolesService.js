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

async function revokeRoleFromUser(userId, roleId) {
    // assuming user and role exists
    // sanity check: does the user have the role?
    try {
        const userRole = await userRolesModel.findOne({
            where: { user_id: userId, role_id: roleId },
        });
        if (!userRole) {
            throw new Error('User does not have the role');
        }
        // delete the role assignment
        await userRolesModel.destroy({
            where: { user_id: userId, role_id: roleId },
        });
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    findUserRolesByUserId,
    assignRoleToUser,
    revokeRoleFromUser,
};
