const request = require('supertest');
const express = require('express');
const colorRoute = require('../../../../../src/components/polish/api/routes/color-route');
const colorService = require('../../../../../src/components/polish/service/color-service');

jest.mock('../../../../../src/components/polish/service/color-service');

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
