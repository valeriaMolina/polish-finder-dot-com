const request = require('supertest');
const express = require('express');
const brandRoute = require('../../../../../src/components/brands/api/routes/brand-route');
const {
    authenticateToken,
    authorize,
} = require('../../../../../src/components/rbac/api/middleware/rbac-middeware');
const {
    validateInsertBrand,
} = require('../../../../../src/components/brands/api/middleware/brand-validator');
const brandService = require('../../../../../src/components/brands/service/brand-service');

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
    '../../../../../src/components/brands/api/middleware/brand-validator'
);

jest.mock('../../../../../src/components/brands/service/brand-service');

const app = express();
app.use('/', brandRoute);

describe('Insert brand route', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    it('responds with 201', async () => {
        brandService.newBrandInsert.mockResolvedValue({ brand_id: 4 });
        const res = await request(app).post('/new');
        expect(res.status).toBe(201);
    });
});

describe('Get all brands route', () => {
    it('responds with 200', async () => {
        brandService.getAllBrands.mockResolvedValue([
            { brand_id: 1, name: 'Test' },
        ]);
        const res = await request(app).get('/all');
        expect(res.status).toBe(200);
    });
    it('responds with 500 on error', async () => {
        brandService.getAllBrands.mockRejectedValue(
            new Error('Database error')
        );
        const res = await request(app).get('/all');
        expect(res.status).toBe(500);
    });
});
