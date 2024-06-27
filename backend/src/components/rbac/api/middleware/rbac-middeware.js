/**
 * @author Valeria Molina Recinos
 */

const jwt = require('jsonwebtoken');
const config = require('../../../../libraries/config/config');
const userService = require('../../../users/service/user-service');
const userRolesService = require('../../service/user-roles-service');
const rolesPermissionsService = require('../../service/roles-permissions-service');
const logger = require('../../../../libraries/logger/logger');

// authenticate the bearer token
const authenticateToken = (req, res, next) => {
    logger.info(`Authenticating token`);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // check that the token is valid
    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
            return res
                .status(403)
                .json({ error: 'Forbidden', msg: err.message });
        }
        req.body.user = user;
        next();
    });
};
function authorize(permissionName) {
    return async (req, res, next) => {
        // find if the user has the required permission
        // for performing this action
        const user = req.body.user;
        const id = user.user.id;

        logger.info(
            `Checking if user with id ${id} has permission ${permissionName}`
        );

        // find user in database
        try {
            const user = await userService.getUserByUserId(id);
            if (user === null) {
                return res.status(400).json({ msg: 'User not found' });
            }
            // check for user role
            const userRoles = await userRolesService.findUserRolesByUserId(
                user.user_id
            );
            if (userRoles.length === 0) {
                return res
                    .status(403)
                    .json({ msg: 'User does not have any permissions.' });
            }
            // check for all roles
            for (const userRole of userRoles) {
                // get the role id
                const roleId = userRole.role_id;
                // get the role's permissions
                const roles =
                    await rolesPermissionsService.findRolesByRoleId(roleId);
                // check if the role has the required permission
                roles.filter((role) => role.permission_name === permissionName);
                if (roles.length > 0) {
                    next();
                } else {
                    return res.status(403).json({
                        msg: 'User does not have the required permission.',
                    });
                }
            }
        } catch (err) {
            logger.error(err);
            return res.status(500).send('Internal Server Error');
        }
    };
}

module.exports = {
    authenticateToken,
    authorize,
};
