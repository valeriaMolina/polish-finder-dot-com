/**
 * @author Valeria Molina Recinos
 */

const insertRouter = require('./insertRouter');
const searchRouter = require('./searchRouter');
const submissionReviewsRouter = require('./submissionReviewsRouter');

const mountRoutes = (app) => {
    app.use(insertRouter);
    app.use(searchRouter);
    app.use(submissionReviewsRouter);
};

module.exports = mountRoutes;
