/**
 * Logger config file
 * @author Valeria Molina Recinos
 */

const pino = require('pino');

//initialize logger
const logger = pino({
    level: 'info',
    transport: {
        target: 'pino-pretty',
    },
});

module.exports = logger;
