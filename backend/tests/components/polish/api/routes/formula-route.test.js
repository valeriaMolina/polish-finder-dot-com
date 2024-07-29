const request = require('supertest');
const express = require('express');
const formulaRoute = require('../../../../../src/components/polish/api/routes/formula-route');
const {
    authenticateToken,
    authorize,
} = require('../../../../../src/components/rbac/api/middleware/rbac-middeware');
const {
    validateAttributeInsert,
} = require('../../../../../src/components/polish/api/middleware/insert-polish-validator');
const formulaService = require('../../../../../src/components/polish/service/formula-service');

jest.mock('../../../../../src/components/polish/service/formula-service');

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
app.use('/', formulaRoute);

describe('Formula route test', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    it('Responds with 201', async () => {
        formulaService.newFormulaInsert.mockResolvedValue({
            formula_id: 4,
            name: 'Glitter',
        });
        const res = await request(app).post('/new');
        expect(res.status).toBe(201);
    });
    it('Responds with an error', async () => {
        formulaService.newFormulaInsert.mockRejectedValue(
            new Error('Test error')
        );
        const res = await request(app).post('/new');
        expect(res.status).toBe(500);
    });
});
