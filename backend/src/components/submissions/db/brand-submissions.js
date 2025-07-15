/**
 * @author Valeria Molina Recinos
 */

const Sequelize = require('sequelize');
const db = require('../../../libraries/db/database');
const users = require('../../users/db/users');

const brandSubmissions = db.define(
    'brand_submissions',
    {
        submission_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
        },
        brand_name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING(50),
            defaultValue: 'pending',
        },
        website: {
            type: Sequelize.TEXT,
        },
    },
    {
        timestamps: false,
    }
);

// create association with user fkey
brandSubmissions.belongsTo(users, { foreignKey: 'user_id' });

module.exports = brandSubmissions;
