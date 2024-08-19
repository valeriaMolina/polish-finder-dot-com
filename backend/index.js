/**
 * @author Valeria Molina Recinos
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { mountRoutes } = require('./src/libraries/config/routes');
const emailService = require('./src/components/users/service/email-service');

app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// verify email client
emailService.verifyEmailClient();

mountRoutes(app);

app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;
