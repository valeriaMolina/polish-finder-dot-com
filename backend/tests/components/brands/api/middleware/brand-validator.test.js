const request = require('supertest');
const brandRoute = require('../../../../../src/components/brands/api/routes/brand-route');
const brandService = require('../../../../../src/components/brands/service/brand-service');
const {
    authenticateToken,
    authorize,
} = require('../../../../../src/components/rbac/api/middleware/rbac-middeware');

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
jest.mock('../../../../../src/components/brands/service/brand-service');

const app = require('../../../../../index');
app.use(brandRoute);

describe('Insert brand validator test', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    it('should respond with 201 status when name is valid', async () => {
        brandService.newBrandInsert.mockResolvedValue({ brand_id: 4 });
        const res = await request(app).post('/new').send({ name: 'test' });
        expect(res.status).toBe(201);
    });
    it('should respond with 400 status when name is invalid', async () => {
        brandService.newBrandInsert.mockResolvedValue({ brand_id: 4 });
        const res = await request(app).post('/new').send({ name: '' });
        expect(res.status).toBe(400);
    });
});

describe('Get brand validator test', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    it('Should respond with 200 status when param is valid', async () => {
        brandService.getBrand.mockResolvedValue({ brand_id: 1, name: 'Test' });
        const res = await request(app).get('/1');
        expect(res.status).toBe(200);
    });
    it('Should respond with 400 status when param is invalid', async () => {
        const res = await request(app).get('/abc');
        expect(res.status).toBe(400);
    });
});
