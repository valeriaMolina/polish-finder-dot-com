/**
 * @author: Valeria Molina Recinos
 * Config for backend
 */

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    postgresUri: process.env.POSTGRES_URI,
    saltRounds: process.env.SALT_ROUNDS,
    jwtSecret: process.env.JWT_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};
