const request = require('supertest');
const express = require('express');
const polishesRoute = require('../../../../../src/components/polish/api/routes/polishes-route');
const polishService = require('../../../../../src/components/polish/service/polish-service');

jest.mock('../../../../../src/components/polish/service/polish-service');

const app = express();
app.use('/', polishesRoute);

describe('polishes route', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    it('responds with 200', async () => {
        polishService.getAllPolishes.mockResolvedValue([
            { polish_id: 1, name: 'Test' },
        ]);
        const res = await request(app).get('/all?page=1&limit=10');
        expect(res.status).toBe(200);
    });
    it('returns 400 if the queries are incorrect', async () => {
        const res = await request(app).get('/all?page=abc&limit=10');
        expect(res.status).toBe(400);
    });
});
