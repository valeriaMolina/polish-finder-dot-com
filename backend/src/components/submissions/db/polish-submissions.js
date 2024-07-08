/**
 * @author Valeria Molina Recinos
 */

const { Sequelize } = require('sequelize');
const db = require('../../../libraries/db/database');
const brand = require('../../brands/db/brands');
const types = require('../../polish/db/types');
const color = require('../../polish/db/colors');

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

module.exports = polishSubmissions;
