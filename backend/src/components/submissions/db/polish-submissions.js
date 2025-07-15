/**
 * @author Valeria Molina Recinos
 */

const { Sequelize } = require('sequelize');
const db = require('../../../libraries/db/database');
const brand = require('../../brands/db/brands');
const types = require('../../polish/db/types');
const color = require('../../polish/db/colors');
const users = require('../../users/db/users');

const polishSubmissions = db.define(
    'polish_submissions',
    {
        submission_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
        },
        brand_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'brands',
                key: 'brand_id',
            },
        },
        type_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'types',
                key: 'type_id',
            },
        },
        primary_color_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'colors',
                key: 'color_id',
            },
        },
        effect_colors_ids: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            allowNull: true,
        },
        formula_ids: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING(50),
            allowNull: false,
            defaultValue: 'pending',
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
        image_url: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);

// create fkey associations
polishSubmissions.belongsTo(users, { foreignKey: 'user_id' });
polishSubmissions.belongsTo(brand, { foreignKey: 'brand_id' });
polishSubmissions.belongsTo(types, { foreignKey: 'type_id' });
polishSubmissions.belongsTo(color, { foreignKey: 'primary_color_id' });

module.exports = polishSubmissions;
