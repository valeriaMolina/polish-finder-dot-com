/**
 * @author Valeria Molina Recinos
 */

const Sequelize = require('sequelize');
const db = require('../config/database');

const colors = db.define(
    'colors',
    {
        color_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = colors;
