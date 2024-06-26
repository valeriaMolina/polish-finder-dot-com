/**
 * @author Valeria Molina Recinos
 */

const insertRouter = require('./insertRouter');
const searchRouter = require('./searchRouter');
const submissionReviewsRouter = require('./submissionReviewsRouter');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const userSubmissionsRouter = require('./userSubmissionsRouter');

const mountRoutes = (app) => {
    app.use(insertRouter);
    app.use(searchRouter);
    app.use(submissionReviewsRouter);
    app.use(authRouter);
    app.use(userSubmissionsRouter);
    app.use('/admin', adminRouter);
};

module.exports = mountRoutes;
