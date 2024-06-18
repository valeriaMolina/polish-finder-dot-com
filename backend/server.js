/**
 * @author Valeria Molina Recinos
 */

const app = require('./index'); // adjust this path to match where your index.js file is located
const config = require('./src/config/config');
const logger = require('./src/config/logger');

const PORT = config.port || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
