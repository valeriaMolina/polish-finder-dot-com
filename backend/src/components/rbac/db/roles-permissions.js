/**
 * @author Valeria Molina Recinos
 */

const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../../libraries/db/database');
const role = require('./roles');
const permission = require('./permissions');

const rolesPermissions = db.define(
    'roles_permissions',
    {
        role_permission_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: role,
                key: 'role_id',
            },
        },
        permission_id: {
            type: DataTypes.INTEGER,
            references: {
                model: permission,
                key: 'permission_id',
            },
        },
    },
    {
        timestamps: false,
    }
);
rolesPermissions.belongsTo(permission, { foreignKey: 'permission_id' });
module.exports = rolesPermissions;
