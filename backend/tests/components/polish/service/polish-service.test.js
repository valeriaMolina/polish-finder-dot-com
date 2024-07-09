const sinon = require('sinon').createSandbox();
const polishModel = require('../../../../src/components/polish/db/polishes');
const polishService = require('../../../../src/components/polish/service/polish-service');
const brandService = require('../../../../src/components/brands/service/brand-service');
const typeService = require('../../../../src/components/polish/service/type-service');
const colorService = require('../../../../src/components/polish/service/color-service');
const formulaService = require('../../../../src/components/polish/service/formula-service');
jest.mock('../../../../src/components/brands/service/brand-service');
jest.mock('../../../../src/components/polish/service/type-service');
jest.mock('../../../../src/components/polish/service/color-service');
jest.mock('../../../../src/components/polish/service/formula-service');

describe('polishService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should find polish by id', async () => {
        const mockPolish = { polish_id: 1 };
        sinon.stub(polishModel, 'findOne').returns(Promise.resolve(mockPolish));

        const polish = await polishService.findPolishById(1);
        expect(polish).toEqual(mockPolish);
    });

    it('should return null if polish is not found', async () => {
        sinon.stub(polishModel, 'findOne').returns(Promise.resolve(null));

        const polish = await polishService.findPolishById(1);
        expect(polish).toBeNull();
    });

    it('should add dupe polish id', async () => {
        const mockPolish = { polish_id: 1, dupes: [] };
        const dupePolish = { polish_id: 2 };
        sinon.stub(polishModel, 'findOne').callsFake((query) => {
            if (query.where.polish_id === 1) return Promise.resolve(mockPolish);
            if (query.where.polish_id === 2) return Promise.resolve(dupePolish);
            return Promise.resolve(null);
        });
        sinon.stub(polishModel, 'update').returns(Promise.resolve([1]));

        const updatedPolish = await polishService.addDupePolishId(1, 2);
        expect(updatedPolish).toEqual([1]);
    });

    it('Should insert a polish successfully', async () => {
        const mockPolish = { polish_id: 1 };
        sinon.stub(polishModel, 'create').returns(Promise.resolve(mockPolish));

        const polish = await polishService.insertNewPolish(mockPolish);
        expect(polish).toEqual(mockPolish);
    });

    it('should throw error when adding polish dupe', async () => {
        sinon.stub(polishModel, 'findOne').returns(Promise.resolve(null));
        expect(polishService.addDupePolishId(1, 2)).rejects.toThrow();
    });

    it('Should test if a polish exists', async () => {
        const mockPolish = { polish_id: 2, name: 'name', brand_id: 4 };
        sinon.stub(polishModel, 'findOne').returns(Promise.resolve(mockPolish));
        const polishExists = await polishService.polishExists('name', 4);
        expect(polishExists).toEqual(mockPolish);
    });

    it('Should insert a new polish', async () => {
        const data = {
            brandName: 'brand',
            type: 'lacquer',
            name: 'name',
            primaryColor: 'blue',
            effectColors: [],
            formulas: ['flake'],
            description: 'description',
        };
        brandService.findBrandNameInTable.mockResolvedValue({
            brand_id: 1,
            name: 'brand',
        });
        sinon.stub(polishModel, 'findOne').returns(Promise.resolve(null));
        // mock the type
        typeService.findTypeByName.mockResolvedValue({
            type_id: 1,
            name: 'lacquer',
        });
        // mock the color queries
        colorService.findColorByName.mockResolvedValue({
            color_id: 1,
            name: 'blue',
        });
        // mock the formulas
        formulaService.findFormulaByName.mockResolvedValue({
            formula_id: 1,
            name: 'flake',
        });
        // mock insert new polish
        sinon.stub(polishModel, 'create').returns(
            Promise.resolve({
                polish_id: 1,
                name: 'name',
                brand_id: 1,
                type_id: 1,
                primary_color: 1,
                effect_colors: [],
                formula_ids: [1],
                description: 'description',
            })
        );
        const newPolish = await polishService.newPolishInsert(data);
        expect(newPolish).toEqual({
            polish_id: 1,
            name: 'name',
            brand_id: 1,
            type_id: 1,
            primary_color: 1,
            effect_colors: [],
            formula_ids: [1],
            description: 'description',
        });
    });
    it('should test searching based on filters', async () => {
        const array = [{ polish_id: 1 }, { polish_id: 2 }, { polish_id: 3 }];
        sinon.stub(polishModel, 'findAll').returns(Promise.resolve(array));
        const filters = {
            type_id: 1,
        };
        const matches = await polishService.search(filters);
        expect(matches.length).toEqual(3);
    });
});
