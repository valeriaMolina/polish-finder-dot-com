const request = require('supertest');
const express = require('express');
const formulaRoute = require('../../../../../src/components/polish/api/routes/formula-route');
const formulaService = require('../../../../../src/components/polish/service/formula-service');

jest.mock('../../../../../src/components/polish/service/formula-service');

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
});
