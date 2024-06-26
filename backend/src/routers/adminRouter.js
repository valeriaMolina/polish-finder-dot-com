/**
 * @author Valeria Molina Recinos
 * Endpoints restricted only to admins
 */

const express = require('express');
const router = express.Router();
const logger = require('../config/logger');
const permissions = require('../constants/permissions');
const userService = require('../services/userService');
const roleService = require('../services/rolesService');
const userRolesService = require('../services/userRolesService');
const {
    authenticateToken,
    authorize,
} = require('../middleware/authMiddleware');

router.post(
    '/role-assign',
    authenticateToken,
    authorize(permissions.MANAGE_ROLES),
    async (req, res) => {
        const { username, roleName } = req.body;
        logger.info(
            `Received request to assign role ${roleName} to user ${username}`
        );
        try {
            // ensure user exists
            const user = await userService.getUserByUsername(username);
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }
            // ensure role exists
            const role = await roleService.findRolesByName(roleName);
            if (!role) {
                return res.status(400).json({ error: 'Role not found' });
            }

            // assign role to user
            const userRole = await userRolesService.assignRoleToUser(
                user.user_id,
                role.role_id
            );
            res.status(201).json(userRole);
        } catch (err) {
            res.status(500).json({
                error: 'Internal Server Error',
                msg: err.message,
            });
        }
    }
);

router.post(
    '/role-revoke',
    authenticateToken,
    authorize(permissions.MANAGE_ROLES),
    async (req, res) => {
        const { username, roleName } = req.body;
        logger.info(
            `Received request to revoke role ${roleName} from user ${username}`
        );
        try {
            // check that user exists
            const user = await userService.getUserByUsername(username);
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }
            // ensure role exists
            const role = await roleService.findRolesByName(roleName);
            if (!role) {
                return res.status(400).json({ error: 'Role not found' });
            }
            // revoke role from user
            await userRolesService.revokeRoleFromUser(
                user.user_id,
                role.role_id
            );
            res.status(200).json({
                message: `Role ${roleName} revoked from user ${username}`,
            });
        } catch (err) {
            res.status(500).json({
                error: 'Internal Server Error',
                msg: err.message,
            });
        }
    }
);

module.exports = router;
