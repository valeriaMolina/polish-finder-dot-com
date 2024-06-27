// import routers
const brand = require('../../components/brands/api/routes/brand-route');
const insert = require('../../components/polish/api/routes/insert-route');
const rbac = require('../../components/rbac/api/routes/rbac-route');
const search = require('../../components/search/api/routes/search-route');
const userSubmissions = require('../../components/submissions/api/routes/user-submissions-router');
const submissionReviews = require('../../components/submissions/api/routes/submission-reviews-router');
const auth = require('../../components/users/api/routes/auth-router');

const mountRoutes = (app) => {
    app.use('/brands', brand);
    app.use('/polish', insert);
    app.use(rbac);
    app.use(search);
    app.use(userSubmissions);
    // app.use(submissionReviews); uncomment once this router is fixed
    app.use(auth);
};

module.exports = {
    mountRoutes,
};
