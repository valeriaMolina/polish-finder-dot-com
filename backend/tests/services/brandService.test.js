const sinon = require('sinon');
const brandModel = require('../../src/models/brandModel');
const brandService = require('../../src/services/brandService');

describe('brandService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should find brand by name', async () => {
        const mockBrand = { name: 'brand1' };
        sinon.stub(brandModel, 'findOne').returns(Promise.resolve(mockBrand));

        const brand = await brandService.findBrandNameInTable('brand1');
        expect(brand).toEqual(mockBrand);
    });

    it('should return null if brand is not found', async () => {
        sinon.stub(brandModel, 'findOne').returns(Promise.resolve(null));

        const brand = await brandService.findBrandNameInTable('nonexistent');
        expect(brand).toBeNull();
    });

    it('should insert a new brand', async () => {
        const mockBrand = { name: 'brand2' };
        sinon.stub(brandModel, 'create').returns(Promise.resolve(mockBrand));

        const brand = await brandService.insertNewBrand('brand2');
        expect(brand).toEqual(mockBrand);
    });
});
