const request = require('supertest');
const polishRoute = require('../../../../../src/components/polish/api/routes/insert-route');
const colorRoute = require('../../../../../src/components/polish/api/routes/color-route');
const polishService = require('../../../../../src/components/polish/service/polish-service');
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
jest.mock('../../../../../src/components/polish/service/polish-service');

const app = require('../../../../../index');
app.use('/polish', polishRoute);
app.use('/color', colorRoute);

describe('Insert polish validation test', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    it('Should respond with 201 status when body is valid', async () => {
        polishService.newPolishInsert.mockResolvedValue({ polish_id: 4 });
        const body = {
            brandName: 'Cuticula',
            type: 'Lacquer',
            primaryColor: 'Black',
            effectColors: ['Black', 'Blue', 'Green'],
            formulas: ['Flake'],
            name: 'fake',
            description:
                'a black jelly base with orange/gold, purple/red, blue/purple, green/blue, blue/purple/green glass like flakes',
        };
        const res = await request(app).post('/polish/new').send(body);
        expect(res.status).toBe(201);
    });
    it('Should respond with 400 status when body is invalid', async () => {
        const res = await request(app).post('/polish/new').send({});
        expect(res.status).toBe(400);
    });
    it('should respond with 400 dtatus when body is invalid', async () => {
        const res = await request(app).post('/color/new').send({});
        expect(res.status).toBe(400);
    });
});
