/**
 * @author Valeria Molina Recinos
 */

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userService = require('../services/userService');
const userRolesService = require('../services/userRolesService');
const rolesPermissionsModel = require('../services/rolesPermissionsService');
const logger = require('../config/logger');

// authenticate the bearer token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // check that the token is valid
    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.body.user = user;
        next();
    });
};
function authorize(permissionName) {
    return async (req, res, next) => {
        // find if the user has the required permission
        // for performing this action
        const { username } = req.body;
        logger.info(
            `Checking if user ${username} has permission ${permissionName}`
        );

        // find user in database
        try {
            const user = await userService.getUserByUsername(username);
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
                    await rolesPermissionsModel.findRolesByRoleId(roleId);
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
