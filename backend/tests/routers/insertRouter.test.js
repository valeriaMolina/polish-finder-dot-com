const request = require('supertest');
const express = require('express');
const router = require('../../src/routers/insertRouter');
const brandService = require('../../src/services/brandService');
const polishService = require('../../src/services/polishService');
const userSubmissionService = require('../../src/services/userSubmissionService');
const userService = require('../../src/services/userService');
const typeService = require('../../src/services/typeService');
const colorService = require('../../src/services/colorService');
const formulaService = require('../../src/services/formulaService');
const logger = require('../../src/config/logger');

// Mock the services and logger
jest.mock('../../src/services/brandService');
jest.mock('../../src/services/polishService');
jest.mock('../../src/services/userSubmissionService');
jest.mock('../../src/services/userService');
jest.mock('../../src/services/typeService');
jest.mock('../../src/services/colorService');
jest.mock('../../src/services/formulaService');
jest.mock('../../src/config/logger');

const app = express();
app.use(express.json());
app.use('/', router);

describe('POST /api/uploadPolish', () => {
    it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/api/uploadPolish')
            .send({ brandName: 'Test Brand' }); // Missing other required fields
        expect(response.statusCode).toBe(400);
    });

    // Add more tests here for the case where all required fields are provided
    it('Should return 200 if all required fields are provided', async () => {
        const mockBody = {
            brandName: 'Test Brand',
            type: 'Test Type',
            primaryColor: 'Test Color',
            effectColors: ['Test Color'],
            formulas: ['Test Formula'],
            name: 'Test Brand',
            description: 'Test Description',
        };

        brandService.findBrandNameInTable.mockResolvedValue(true); // Mock that brand exists
        typeService.findTypeByName.mockResolvedValue(true); // Mock that type exists
        colorService.findColorByName.mockResolvedValue(true); // Mock that color exists
        formulaService.findFormulaByName.mockResolvedValue(true); // Mock that formula exists
        polishService.insertNewPolish.mockResolvedValue(true); // Mock that polish is successfully inserted

        const response = await request(app)
            .post('/api/uploadPolish')
            .send(mockBody);
        expect(response.statusCode).toBe(201);
    });
});

describe('POST /api/brand', () => {
    it('should return 400 if name is missing', async () => {
        const response = await request(app).post('/api/brand').send({}); // Missing name
        expect(response.statusCode).toBe(400);
    });

    it('should return 400 if brand already exists', async () => {
        brandService.findBrandNameInTable.mockResolvedValue(true); // Mock that brand already exists

        const response = await request(app)
            .post('/api/brand')
            .send({ name: 'Test Brand' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            error: 'Test Brand is already in the database',
        });
    });

    // Add more tests here for the case where brand is successfully inserted
});

describe('POST /api/linkDupe', () => {
    it('should return 400 if user is not found', async () => {
        userService.getUserId.mockResolvedValue(null); // Mock that user is not found

        const response = await request(app)
            .post('/api/linkDupe?polishId=1&dupeId=2')
            .send({ username: 'nonexistent' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'User not found' });
    });

    // Add more tests here for the case where user is found and submission is successful
});
