const request = require('supertest');
const express = require('express');
const insertRoute = require('../../../../../src/components/polish/api/routes/insert-route');
const {
    authenticateToken,
    authorize,
} = require('../../../../../src/components/rbac/api/middleware/rbac-middeware');
const {
    validateInsertPolish,
} = require('../../../../../src/components/polish/api/middleware/insert-polish-validator');
const polishService = require('../../../../../src/components/polish/service/polish-service');

jest.mock(
    '../../../../../src/components/rbac/api/middleware/rbac-middeware',
    () => {
        const originalModule = jest.requireActual(
            '../../../../../src/components/rbac/api/middleware/rbac-middeware'
        );

        // Mock only 'authenticateToken' and 'authorize' functions
        return {
            ...originalModule, // spread the original module to retain non-mocked functions
            authenticateToken: jest.fn((req, res, next) => next()),
            authorize: jest.fn((permission) => (req, res, next) => next()),
        };
    }
);
jest.mock(
    '../../../../../src/components/polish/api/middleware/insert-polish-validator'
);
jest.mock('../../../../../src/components/polish/service/polish-service');

const app = express();
app.use('/', insertRoute);

describe('Insert polish route', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    it('responds with 201', async () => {
        polishService.newPolishInsert.mockResolvedValue({ polish_id: 4 });
        const res = await request(app).post('/new');
        expect(res.status).toBe(201);
    });
    it('responds with an error', async () => {
        polishService.newPolishInsert.mockRejectedValue(
            new Error('Test error')
        );
        const res = await request(app).post('/new');
        expect(res.status).toBe(500);
    });
});
