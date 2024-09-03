/**
 * @author Valeria Molina Recinos
 */

const { Sequelize } = require('sequelize');
const db = require('../../../libraries/db/database');
const users = require('./users');

const tokens = db.define(
    'tokens',
    {
        token_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        token_hash: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

// create association with user_id foreign key
tokens.belongsTo(users, { foreignKey: 'user_id' });

module.exports = tokens;
