/**
 * @author Valeria Molina Recinos
 */

const Sequelize = require('sequelize');
const db = require('../../../libraries/db/database');
const user = require('../../users/db/users');
const polish = require('../../polish/db/polishes');

const userLikes = db.define('user_likes_polish', {
    polish_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'polishes',
            key: 'polish_id',
        },
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'user_id',
        },
        primaryKey: true,
    },
});

// define relationships
user.belongsToMany(polish, { through: userLikes });
polish.belongsToMany(user, { through: userLikes });
