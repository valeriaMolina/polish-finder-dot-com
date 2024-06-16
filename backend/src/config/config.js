/**
 * @author: Valeria Molina Recinos
 * Config for backend
 */

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
};
