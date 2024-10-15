/**
 * @author Valeria Molina Recinos
 */

const app = require('./index'); // adjust this path to match where your index.js file is located
const config = require('./src/libraries/config/config');
const logger = require('./src/libraries/logger/logger');
const emailService = require('./src/components/users/service/email-service');

const PORT = config.port || 5000;
const server = app.listen(PORT, () =>
    logger.info(`Server running on port ${PORT}`)
);

process.on('SIGINT', () => {
    console.log('Closing server...');
    server.close(() => {
        emailService.close();
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('Closing server...');
    server.close(() => {
        emailService.close();
        console.log('Server closed');
        process.exit(0);
    });
});
