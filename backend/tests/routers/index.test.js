const request = require('supertest');
const express = require('express');
const mountRoutes = require('../../src/routers/index');

// Mock the routers
jest.mock('../../src/routers/insertRouter', () => (req, res, next) => next());
jest.mock('../../src/routers/searchRouter', () => (req, res, next) => next());
jest.mock(
    '../../src/routers/submissionReviewsRouter',
    () => (req, res, next) => next()
);
jest.mock('../../src/routers/authRouter', () => (req, res, next) => next());

describe('mountRoutes', () => {
    it('should mount all routers', () => {
        const app = { use: jest.fn() };
        mountRoutes(app);
        expect(app.use).toHaveBeenCalledTimes(4);
    });

    it('should handle requests', async () => {
        const app = express();
        mountRoutes(app);
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(404); // Expect 404 because no route handles '/'
    });
});
