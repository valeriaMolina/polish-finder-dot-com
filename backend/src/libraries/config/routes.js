// import routers
const brand = require('../../components/brands/api/routes/brand-route');
const insert = require('../../components/polish/api/routes/insert-route');
const polishes = require('../../components/polish/api/routes/polishes-route');
const rbac = require('../../components/rbac/api/routes/rbac-route');
const search = require('../../components/search/api/routes/search-route');
const userSubmissions = require('../../components/submissions/api/routes/user-submissions-router');
const submissionReviews = require('../../components/submissions/api/routes/submission-reviews-router');
const auth = require('../../components/users/api/routes/auth-router');
const formula = require('../../components/polish/api/routes/formula-route');
const colors = require('../../components/polish/api/routes/color-route');
const likes = require('../../components/likes/api/routes/likes-route');
const submissionList = require('../../components/submissions/api/routes/submission-list-router');

const mountRoutes = (app) => {
    app.use('/brands', brand);
    app.use('/polish', insert);
    app.use('/polish', polishes);
    app.use('/colors', colors);
    app.use('/formulas', formula);
    app.use('/role', rbac);
    app.use('/search', search);
    app.use('/submissions', submissionList);
    app.use('/submit', userSubmissions);
    app.use('/update', submissionReviews);
    app.use('/user-likes', likes);
    app.use(auth);
};

module.exports = {
    mountRoutes,
};
