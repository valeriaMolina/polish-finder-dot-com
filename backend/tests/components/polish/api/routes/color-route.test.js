const request = require('supertest');
const express = require('express');
const colorRoute = require('../../../../../src/components/polish/api/routes/color-route');
const colorService = require('../../../../../src/components/polish/service/color-service');
const {
    authenticateToken,
    authorize,
} = require('../../../../../src/components/rbac/api/middleware/rbac-middeware');

jest.mock('../../../../../src/components/polish/service/color-service');
const {
    validateAttributeInsert,
} = require('../../../../../src/components/polish/api/middleware/insert-polish-validator');

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

const app = express();
app.use('/', colorRoute);

describe('Color route test', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    it('Responds with 201', async () => {
        colorService.newColorInsert.mockResolvedValue({ color_id: 4 });
        const res = await request(app).post('/new');
        expect(res.status).toBe(201);
    });
});
