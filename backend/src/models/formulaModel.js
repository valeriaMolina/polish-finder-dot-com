/**
 * @author Valeria Molina Recinos
 */

const Sequelize = require('sequelize');
const db = require('../config/database');

const formulas = db.define(
    'formulas',
    {
        formula_id: {
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

module.exports = formulas;
