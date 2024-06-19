/**
 * @author Valeria Molina Recinos
 */

const { Sequelize } = require('sequelize');
const db = require('../config/database');

const user = require('./userModel');
const polish = require('./polishModel');

const userSubmission = db.define(
    'user_submissions',
    {
        submission_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
        },
        status: {
            type: Sequelize.STRING(50),
            allowNull: false,
            defaultValue: 'pending',
        },
    },
    {
        timestamps: false,
    }
);

// create associations with foreign keys
userSubmission.belongsTo(user, { foreignKey: 'user_id' });
userSubmission.belongsTo(polish, { foreignKey: 'polish_id' });
userSubmission.belongsTo(polish, { foreignKey: 'similar_to_polish_id' });

module.exports = userSubmission;
