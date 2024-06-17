/**
 * @author Valeria Molina Recinos
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./src/config/config');
const logger = require('./src/config/logger');
const mountRoutes = require('./src/routers/index');

app.use(cors());
app.use(bodyParser.json());

mountRoutes(app);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = config.port || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
