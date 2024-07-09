const {
    validateSearch,
    validateDupeSearch,
    validateMatchSearch,
} = require('../../../../../src/components/search/api/middleware/search-validator');
const { validationResult } = require('express-validator');
const brandService = require('../../../../../src/components/brands/service/brand-service');
const typeService = require('../../../../../src/components/polish/service/type-service');
const colorService = require('../../../../../src/components/polish/service/color-service');
const formulaService = require('../../../../../src/components/polish/service/formula-service');

// Mocking validationResult to control its output
jest.mock('express-validator', () => {
    const originalModule = jest.requireActual('express-validator');
    return {
        ...originalModule,
        validationResult: jest.fn(),
    };
});

jest.mock('../../../../../src/components/brands/service/brand-service');
jest.mock('../../../../../src/components/polish/service/type-service');
jest.mock('../../../../../src/components/polish/service/color-service');
jest.mock('../../../../../src/components/polish/service/formula-service');

describe('validateSearch middleware', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = {
            body: {
                brandName: 'Cuticula',
                type: 'Gel',
                primaryColor: 'Black',
                effectColors: ['Black'],
                formulas: ['Flake'],
                name: 'Unicorn',
            },
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        mockNext = jest.fn();
        validationResult.mockImplementation(() => ({ isEmpty: () => true })); // Assume validation passes by default
    });
    it('Should call next() if validation passes', async () => {
        brandService.findBrandNameInTable.mockResolvedValue({ brand_id: 4 });
        typeService.findTypeByName.mockResolvedValue({ type_id: 1 });
        colorService.findColorByName.mockResolvedValue({ color_id: 1 });
        formulaService.findFormulaByName.mockResolvedValue({ formula_id: 1 });
        await validateSearch[validateSearch.length - 1](
            mockReq,
            mockRes,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledTimes(1);
    });
    it('Should respond with 400 status if body is empty', async () => {
        mockReq = {
            body: {},
        };
        await validateSearch[validateSearch.length - 1](
            mockReq,
            mockRes,
            mockNext
        );
        expect(mockRes.status).toHaveBeenCalledWith(400);
    });
    it('Should respond 400 error if validation fails', async () => {
        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => [{ msg: 'Invalid input' }],
        }));
        await validateSearch[validateSearch.length - 1](
            mockReq,
            mockRes,
            mockNext
        );
        expect(mockRes.status).toHaveBeenCalledWith(400);
    });
});

describe('validateDupeSearch middleware', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = { body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        mockNext = jest.fn();
        validationResult.mockImplementation(() => ({ isEmpty: () => true })); // Assume validation passes by default
    });

    it('Should call next() if validation passes', async () => {
        await validateDupeSearch[validateDupeSearch.length - 1](
            mockReq,
            mockRes,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledTimes(1);
    });

    it('Should respond with 400 status if validation fails', async () => {
        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => [{ msg: 'Invalid input' }],
        }));

        await validateDupeSearch[validateDupeSearch.length - 1](
            mockReq,
            mockRes,
            mockNext
        );
        expect(mockRes.status).toHaveBeenCalledWith(400);
    });
});

describe('validateMatchSearch middleware', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = {
            body: {
                brandName: 'Cuticula',
                type: 'Gel',
                primaryColor: 'Black',
                effectColors: ['Black'],
                formulas: ['Flake'],
                name: 'Unicorn',
            },
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        mockNext = jest.fn();
        validationResult.mockImplementation(() => ({ isEmpty: () => true })); // Assume validation passes by default
    });
    it('Should call next() if validation passes', async () => {
        await validateMatchSearch[validateMatchSearch.length - 1](
            mockReq,
            mockRes,
            mockNext
        );
        expect(mockNext).toHaveBeenCalledTimes(1);
    });
    it('Should respond with 400 status if validation fails', async () => {
        validationResult.mockImplementation(() => ({
            isEmpty: () => false,
            array: () => [{ msg: 'Invalid input' }],
        }));
        await validateMatchSearch[validateMatchSearch.length - 1](
            mockReq,
            mockRes,
            mockNext
        );
        expect(mockRes.status).toHaveBeenCalledWith(400);
    });
});
