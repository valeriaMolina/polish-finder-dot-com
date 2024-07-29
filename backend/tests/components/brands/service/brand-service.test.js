const sinon = require('sinon');
const brandModel = require('../../../../src/components/brands/db/brands');
const brandService = require('../../../../src/components/brands/service/brand-service');

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
    it('Should check if a brand exists', async () => {
        const name = 'brand1';
        sinon
            .stub(brandModel, 'findOne')
            .returns(Promise.resolve({ brand_id: 3, name }));
        const brandQuery = await brandService.isBrandInTable(name);
        expect(brandQuery).toEqual({ brand_id: 3, name });
    });
    it('Should insert a new brand', async () => {
        const mockData = {
            name: 'brand2',
        };
        const mockBrand = { brand_id: 3, name: 'brand2' };
        sinon.stub(brandModel, 'findOne').returns(Promise.resolve(null));
        sinon.stub(brandModel, 'create').returns(Promise.resolve(mockBrand));

        const newBrand = await brandService.newBrandInsert(mockData);
        expect(newBrand).toEqual(mockBrand);
    });
});

describe('getAllBrands', () => {
    it('Should retrieve all brands', async () => {
        const mockBrands = [
            { brand_id: 1, name: 'brand1' },
            { brand_id: 2, name: 'brand2' },
        ];
        sinon.stub(brandModel, 'findAll').returns(Promise.resolve(mockBrands));

        const brands = await brandService.getAllBrands();
        expect(brands).toEqual(mockBrands);
    });
});

describe('getBrand', () => {
    it('Should retrieve a brand by id', async () => {
        const mockBrand = { brand_id: 1, name: 'brand1' };
        const brandId = 1;
        sinon.stub(brandModel, 'findOne').returns(Promise.resolve(mockBrand));

        const brand = await brandService.getBrand(brandId);
        expect(brand).toEqual(mockBrand);
    });
});
