/**
 * @author Valeria Molina Recinos
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { mountRoutes } = require('./src/libraries/config/routes');
const config = require('./src/libraries/config/config');
const emailService = require('./src/components/users/service/email-service');

app.use(cookieParser());
app.use(cors({ origin: config.homePage, credentials: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// verify email client
emailService.verifyEmailClient();

mountRoutes(app);

app.get('/', (req, res) => {
    res.send('API is running...');
});

process.on('SIGINT', () => {
    console.log('Closing server...');
    app.close(() => {
        emailService.close();
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('Closing server...');
    app.close(() => {
        emailService.close();
        console.log('Server closed');
        process.exit(0);
    });
});

module.exports = app;
