const express = require('express');
const request = require('supertest');
const searchRoute = require('../../../../../src/components/search/api/routes/search-route');
const searchService = require('../../../../../src/components/search/service/search-service');
const brandService = require('../../../../../src/components/brands/service/brand-service');
const { validationResult } = require('express-validator');

jest.mock('../../../../../src/components/search/service/search-service');
jest.mock('../../../../../src/components/brands/service/brand-service');

jest.mock('express-validator', () => {
    const originalModule = jest.requireActual('express-validator');
    return {
        ...originalModule,
        validationResult: jest.fn(),
    };
});

const app = express();
app.use(express.json());
app.use('/', searchRoute);
describe('Search route test', () => {
    beforeEach(() => {
        validationResult.mockImplementation(() => ({ isEmpty: () => true })); // Assume validation passes by default
    });
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });
    it('Should search for polishes base on the search query', async () => {
        brandService.findBrandNameInTable.mockResolvedValue({ brand_id: 4 });
        searchService.search.mockResolvedValue([{ polish_id: 4 }]);
        const mockBody = {
            brandName: 'Test Brand',
        };
        const response = await request(app).get('/').send(mockBody);
        expect(response.status).toBe(200);
    });
    it('Should return error if search fails', async () => {
        brandService.findBrandNameInTable.mockResolvedValue({ brand_id: 4 });
        searchService.search.mockRejectedValue(new Error('Test error'));
        const mockBody = {
            brandName: 'Test Brand',
        };
        const response = await request(app).get('/').send(mockBody);
        expect(response.status).toBe(500);
    });
});
