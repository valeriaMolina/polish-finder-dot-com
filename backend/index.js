/**
 * @author Valeria Molina Recinos
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mountRoutes = require('./src/routers/index');

app.use(cors());
app.use(bodyParser.json());

mountRoutes(app);

app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;
