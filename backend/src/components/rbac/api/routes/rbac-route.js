/**
 * @author Valeria Molina Recinos
 * Endpoints restricted only to admins
 */

const express = require('express');
const router = express.Router();
const logger = require('../../../../libraries/logger/logger');
const permissions = require('../../../../libraries/constants/permissions');
const roleService = require('../../service/roles-service');
const {
    authenticateToken,
    authorize,
} = require('../middleware/rbac-middeware');

/**
 * Endpoint to assign a role to a user.
 * This endpoint is restricted to users with the MANAGE_ROLES permission.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Object} req.body - The request body containing the username and roleName
 * @param {string} req.body.username - The username of the user
 * @param {string} req.body.roleName - The name of the role to be assigned
 *
 * @returns {Promise} - A promise that resolves to the response object with status 201 and a JSON object containing the new user role
 * @throws Will throw an error if the user does not have the MANAGE_ROLES permission or if there is an error while assigning the role
 */
router.post(
    '/assign',
    authenticateToken,
    authorize(permissions.MANAGE_ROLES),
    async (req, res) => {
        const { username, roleName } = req.body;
        logger.info(
            `Received request to assign role ${roleName} to user ${username}`
        );
        try {
            const newUserRole = await roleService.assignRole(req.body);
            res.status(201).json(newUserRole);
        } catch (err) {
            if (err.statusCode) {
                return res.status(err.statusCode).send({ error: err.message });
            } else {
                // error was not anticipated
                logger.error(`Error not anticipated: ${err.message}`);
                return res.status(500).send({ error: err.message });
            }
        }
    }
);

/**
 * Endpoint to revoke a role from a user.
 * This endpoint is restricted to users with the MANAGE_ROLES permission.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Object} req.body - The request body containing the username and roleName
 * @param {string} req.body.username - The username of the user
 * @param {string} req.body.roleName - The name of the role to be revoked
 *
 * @returns {Promise} - A promise that resolves to the response object with status 200 and a JSON object containing a message
 * @throws Will throw an error if the user does not have the MANAGE_ROLES permission or if there is an error while revoking the role
 */
router.post(
    '/revoke',
    authenticateToken,
    authorize(permissions.MANAGE_ROLES),
    async (req, res) => {
        try {
            await roleService.revokeRole(req.body);
            res.status(200).json({ message: 'Role revoked' });
        } catch (err) {
            if (err.statusCode) {
                return res.status(err.statusCode).send({ error: err.message });
            } else {
                // error was not anticipated
                logger.error(`Error not anticipated: ${err.message}`);
                return res.status(500).send({ error: err.message });
            }
        }
    }
);

module.exports = router;
