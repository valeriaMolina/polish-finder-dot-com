/**
 * @author Valeria Molina Recinos
 */

const { Sequelize } = require('sequelize');
const db = require('../../../libraries/db/database');

const user = require('../../users/db/users');
const polish = require('../../polish/db/polishes');

const dupeSubmissions = db.define(
    'dupe_submissions',
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
dupeSubmissions.belongsTo(user, { foreignKey: 'user_id' });
dupeSubmissions.belongsTo(polish, { foreignKey: 'polish_id' });
dupeSubmissions.belongsTo(polish, { foreignKey: 'similar_to_polish_id' });

module.exports = dupeSubmissions;
