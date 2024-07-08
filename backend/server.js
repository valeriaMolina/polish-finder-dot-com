/**
 * @author Valeria Molina Recinos
 */

const app = require('./index'); // adjust this path to match where your index.js file is located
const config = require('./src/libraries/config/config');
const logger = require('./src/libraries/logger/logger');

const PORT = config.port || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
