/**
 * @author Valeria Molina Recinos
 */

const rolesModel = require('../db/roles');
// external dependencies
const logger = require('../../../libraries/logger/logger');
const userRolesService = require('./user-roles-service');
const userService = require('../../users/service/user-service');
const {
    UserNotFoundError,
    RoleNotFoundError,
    UserRoleDoesNotExist,
} = require('../../../libraries/utils/error-handler');

async function findRolesByName(name) {
    const role = await rolesModel.findOne({ where: { name: name } });
    return role;
}

/**
 * Assigns a role to a user.
 *
 * @param {Object} data - The data object containing the username and roleName.
 * @param {string} data.username - The username of the user.
 * @param {string} data.roleName - The name of the role to be assigned.
 *
 * @throws {UserNotFoundError} - If the user with the given username does not exist.
 * @throws {RoleNotFoundError} - If the role with the given name does not exist.
 *
 * @returns {Promise<Object>} - A promise that resolves to the newly created user-role association.
 */
async function assignRole(data) {
    // ensure user exists
    const userExists = await userService.getUserByUsername(data.username);
    if (!userExists) {
        // error, the user does not exist
        logger.error(`User ${data.username} not found`);
        throw new UserNotFoundError('User not found');
    }
    // ensure role exists
    const roleExists = await findRolesByName(data.roleName);
    if (!roleExists) {
        // error
        logger.error(`Role ${data.roleName} not found`);
        throw new RoleNotFoundError('Role not found');
    }
    // assign role to user
    const userRole = await userRolesService.assignRoleToUser(
        userExists.user_id,
        roleExists.role_id
    );
    return userRole;
}

/**
 * Revokes a role from a user.
 *
 * @param {Object} data - The data object containing the username and roleName.
 * @param {string} data.username - The username of the user.
 * @param {string} data.roleName - The name of the role to be revoked.
 *
 * @throws {UserNotFoundError} - If the user with the given username does not exist.
 * @throws {RoleNotFoundError} - If the role with the given name does not exist.
 *
 * @returns {Promise<void>} - A promise that resolves when the role is successfully revoked from the user.
 */
async function revokeRole(data) {
    // ensure user exists
    const userExists = await userService.getUserByUsername(data.username);
    if (!userExists) {
        // error, the user does not exist
        logger.error(`User ${data.username} not found`);
        throw new UserNotFoundError('User not found');
    }
    // ensure role exists
    const roleExists = await findRolesByName(data.roleName);
    if (!roleExists) {
        // error
        logger.error(`Role ${data.roleName} not found`);
        throw new RoleNotFoundError('Role not found');
    }
    // revoke role from user
    try {
        await userRolesService.revokeRoleFromUser(
            userExists.user_id,
            roleExists.role_id
        );
    } catch (err) {
        logger.error(`Error: ${err.message}`);
        throw new UserRoleDoesNotExist('User role does not have this role');
    }
}

module.exports = {
    findRolesByName,
    assignRole,
    revokeRole,
};
