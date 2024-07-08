/**
 * @author Valeria Molina Recinos
 * Database config file for postgreSQL
 */

const { Sequelize } = require('sequelize');
const config = require('../config/config');

module.exports = new Sequelize(config.postgresUri);
