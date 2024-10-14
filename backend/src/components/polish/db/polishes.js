/**
 * @author Valeria Molina Recinos
 */

const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../../libraries/db/database');

const brand = require('../../brands/db/brands');
const type = require('./types');
const color = require('./colors');

const polishes = db.define(
    'polishes',
    {
        polish_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
        },
        effect_colors: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        formula_ids: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        dupes: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true,
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);

// create associations with foreign keys
polishes.belongsTo(brand, { foreignKey: 'brand_id' });
polishes.belongsTo(type, { foreignKey: 'type_id' });
polishes.belongsTo(color, { foreignKey: 'primary_color' });

module.exports = polishes;
