const request = require('supertest');
const polishRoute = require('../../../../../src/components/polish/api/routes/polishes-route');
const polishService = require('../../../../../src/components/polish/service/polish-service');
const emailService = require('../../../../../src/components/users/service/email-service');

jest.mock('../../../../../src/components/polish/service/polish-service');
const app = require('../../../../../index');
app.use('/polish', polishRoute);

describe('Polish search validator test', () => {
    afterAll(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
        emailService.close();
    });

    it('Should validate a polish search request', async () => {
        polishService.getAllPolishes.mockResolvedValue([]);
        const res = await request(app).get('/polish/all?page=1&limit=10');
        expect(res.status).toBe(200);
    });
    it('Should return 400 status when query parameters are invalid', async () => {
        const res = await request(app).get('/polish/all?page=abc&limit=10');
        expect(res.status).toBe(400);
    });
});
