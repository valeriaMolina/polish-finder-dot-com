/**
 * @author Valeria Molina Recinos
 */

const Sequelize = require('sequelize');
const db = require('../config/database');

const types = db.define(
    'types',
    {
        type_id: {
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

module.exports = types;
