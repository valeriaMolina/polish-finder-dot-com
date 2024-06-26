/**
 * @author Valeria Molina Recinos
 * Define the relationships between the models
 */

const database = require('../../config/database');
const user = require('./userModel');
const role = require('./roleModel');
const permission = require('./permissionsModel');
const userRole = require('./userRolesModel');
const rolePermission = require('./rolesPermissionsModel');

// Establish the relationship between the models
user.belongsToMany(role, { through: userRole, foreignKey: 'user_id' });
role.belongsToMany(user, { through: userRole, foreignKey: 'role_id' });

role.belongsToMany(permission, {
    through: rolePermission,
    foreignKey: 'role_id',
});
permission.belongsToMany(role, {
    through: rolePermission,
    foreignKey: 'permission_id',
});

module.exports = {
    database,
    user,
    role,
    permission,
    userRole,
    rolePermission,
};
