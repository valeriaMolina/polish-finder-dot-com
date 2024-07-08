/**
 * @author Valeria Molina Recinos
 */

const logger = require('../../../libraries/logger/logger');
const userRolesModel = require('../db/user-roles');
const {
    SequelizeValidationError,
} = require('../../../libraries/utils/error-handler');

async function findUserRolesByUserId(userId) {
    // finds the user role based on the user id
    const userRoles = await userRolesModel.findAll({
        where: { user_id: userId },
    });
    return userRoles;
}

async function assignRoleToUser(userId, roleId) {
    // This method will find a user role matching the userId and roleId.
    // If it does not exist, it will create a new one with the provided userId and roleId.
    try {
        const [userRole, created] = await userRolesModel.findOrCreate({
            where: { user_id: userId },
            defaults: { user_id: userId, role_id: roleId },
        });
        // The `created` variable is a boolean indicating whether a new record was created.
        if (created) {
            logger.info(
                `Created new user role for user ${userId} and role ${roleId}`
            );
        } else {
            // modify the role assignment
            userRole.role_id = roleId;
            await userRole.save();
            logger.info(
                `Updated existing user role for user ${userId} and role ${roleId}`
            );
        }
        return userRole;
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            // handle validation errors
            const errors = err.errors.map((error) => error.message);
            logger.error(`Validation error: ${errors.join(', ')}`);
            throw new SequelizeValidationError(
                `Validation error: ${errors.join(', ')}`
            );
        } else {
            // other errors
            logger.error(`Unexpected error: ${err.message}`);
            throw err;
        }
    }
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
