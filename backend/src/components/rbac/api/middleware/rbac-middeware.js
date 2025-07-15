/**
 * @author Valeria Molina Recinos
 */

const jwt = require('jsonwebtoken');
const config = require('../../../../libraries/config/config');
const userService = require('../../../users/service/user-service');
const userRolesService = require('../../service/user-roles-service');
const rolesPermissionsService = require('../../service/roles-permissions-service');
const logger = require('../../../../libraries/logger/logger');

/**
 * This middleware is reponsible for authenticating the token included
 * with requests that come from users logged in.
 *
 * We want to verify they are still logged in and have a valid token
 * associated with them
 * If they are not, an appropriate error response is returned
 * 401 if no token provided, 403 if invalid token, 500 if internal server error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const authenticateToken = (req, res, next) => {
    logger.info(`Authenticating token`);
    const token = req.cookies.accessToken;
    if (!token) {
        logger.info('No token provided');
        return res
            .status(401)
            .json({ error: 'No token provided', name: 'MissingTokenError' });
    }
    try {
        const user = jwt.verify(token, config.jwtSecret);
        req.body.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            logger.error(`Token Expired: ${err.message}`);
            return res
                .status(401)
                .json({ error: 'Token expired', name: 'TokenExpiredError' });
        } else if (err.name === 'JsonWebTokenError') {
            logger.error(`Invalid token: ${err.message}`);
            return res
                .status(403)
                .json({ error: 'Invalid token', name: 'JsonWebTokenError' });
        } else {
            logger.error(`Error authenticating token: ${err.message}`);
            return res
                .status(403)
                .json({ error: 'Invalid token', name: 'Forbidden' });
        }
    }
};

/**
 * A middleware that handles authorization requests from users
 * We want to make sure that the user is authenticated and
 * allowed to access the endpoint
 *
 * If the user has no permissions, sends an appropriate error response
 * 403 if unauthorized, 500 if internal server error
 * @param {String} permissionName
 * @returns {Function} A middleware function that returns a Promise
 */
function authorize(permissionName) {
    return async (req, res, next) => {
        // find if the user has the required permission
        // for performing this action
        const user = req.body.user;
        const id = user.user.id;

        logger.info(
            `Authorization: Checking if user with id ${id} has permission ${permissionName}`
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
                const rolesList =
                    await rolesPermissionsService.findPermissionsByRoleId(
                        roleId
                    );
                // check if the role has the required permission
                const usrRoleArray = rolesList.filter(
                    (role) => role.permission.name === permissionName
                );
                // if the user has the required permission, proceed to the next middleware
                if (usrRoleArray.length > 0) {
                    // user has the required permission
                    next();
                } else {
                    // user does not have the required permission
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
