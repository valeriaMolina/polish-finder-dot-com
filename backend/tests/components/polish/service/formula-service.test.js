const sinon = require('sinon');
const formulaModel = require('../../../../src/components/polish/db/formulas');
const formulaService = require('../../../../src/components/polish/service/formula-service');

describe('formulaService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should find formula by name', async () => {
        const mockFormula = { name: 'formula1' };
        sinon
            .stub(formulaModel, 'findOne')
            .returns(Promise.resolve(mockFormula));

        const formula = await formulaService.findFormulaByName('formula1');
        expect(formula).toEqual(mockFormula);
    });

    it('should return null if formula is not found', async () => {
        sinon.stub(formulaModel, 'findOne').returns(Promise.resolve(null));

        const formula = await formulaService.findFormulaByName('nonexistent');
        expect(formula).toBeNull();
    });

    it('should get all formulas', async () => {
        const mockFormulas = [{ name: 'creme' }, { name: 'shimmer' }];
        sinon
            .stub(formulaModel, 'findAll')
            .returns(Promise.resolve(mockFormulas));

        const formulas = await formulaService.getAllFormulas();
        expect(formulas).toEqual(mockFormulas);
    });
});
