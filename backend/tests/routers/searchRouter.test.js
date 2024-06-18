const request = require('supertest');
const express = require('express');
const router = require('../../src/routers/searchRouter');
const polishService = require('../../src/services/polishService');
const logger = require('../../src/config/logger');

// Mock the services and logger
jest.mock('../../src/services/polishService');
jest.mock('../../src/config/logger');

const app = express();
app.use(express.json());
app.use('/', router);

describe('GET /api/search/', () => {
    it('should return 404 if no dupes found', async () => {
        polishService.findPolishById.mockResolvedValue({ dupes: null });

        const response = await request(app).get('/api/search/?polishId=1');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: 'No dupes found' });
    });

    it('should return 200 and the dupes if dupes are found', async () => {
        polishService.findPolishById.mockResolvedValue({
            dupes: ['dupe1', 'dupe2'],
        });

        const response = await request(app).get('/api/search/?polishId=1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ matches: ['dupe1', 'dupe2'] });
    });
});
