/**
 * @author Valeria Molina Recinos
 */

const Sequelize = require('sequelize');
const db = require('../config/database');

const brandSubmissions = db.define(
    'brand_submissions',
    {
        brand_id: {
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
    },
    {
        timestamps: false,
    }
);

module.exports = brandSubmissions;
