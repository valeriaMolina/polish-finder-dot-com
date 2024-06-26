/**
 * @author Valeria Molina Recinos
 */

const { Sequelize } = require('sequelize');
const db = require('../config/database');

const polishSubmissions = db.define('polish_submissions', {
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
    type: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    primary_color_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'colors',
            key: 'color_id',
        },
    },
    effect_color_ids: {
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
    desscription: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'pending',
    },
});

// create associations with foreign keys
polishSubmissions.belongsTo(brand, { foreignKey: 'brand_id' });
polishSubmissions.belongsTo(type, { foreignKey: 'type_id' });
polishSubmissions.belongsTo(type, { foreignKey: 'primary_color_id' });

module.exports = polishSubmissions;
