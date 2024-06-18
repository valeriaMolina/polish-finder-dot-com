/**
 * @author Valeria Molina Recinos
 */

const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const users = db.define(
    'users',
    {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
        },
        username: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Invalid email address',
                },
            },
        },
        password_hash: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = users;
