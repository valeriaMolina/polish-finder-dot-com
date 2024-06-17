/**
 * @author Valeria Molina Recinos
 */

const insertRouter = require('./insertRouter');
const searchRouter = require('./searchRouter');

const mountRoutes = (app) => {
    app.use(insertRouter);
    app.use(searchRouter);
};

module.exports = mountRoutes;
