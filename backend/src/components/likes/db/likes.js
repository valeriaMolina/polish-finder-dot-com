/**
 * @author Valeria Molina Recinos
 */

const Sequelize = require('sequelize');
const db = require('../../../libraries/db/database');
const user = require('../../users/db/users');
const polish = require('../../polish/db/polishes');

const userLikes = db.define(
    'user_likes',
    {
        polish_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
    },
    { timestamps: false }
);

// define relationships
user.belongsToMany(polish, { through: userLikes, foreignKey: 'user_id' });
polish.belongsToMany(user, { through: userLikes, foreignKey: 'polish_id' });

module.exports = userLikes;
