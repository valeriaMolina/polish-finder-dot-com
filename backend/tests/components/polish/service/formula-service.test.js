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
    it('should insert a new formula', async () => {
        const mockFormula = { formula: 'formula2' };
        const newFormula = { formula_id: 4, name: 'formula2' };
        sinon.stub(formulaModel, 'findOne').returns(Promise.resolve(null));
        sinon.stub(formulaModel, 'create').returns(Promise.resolve(newFormula));

        const test = await formulaService.newFormulaInsert(mockFormula);
        expect(test).toEqual(newFormula);
    });
    it('Should throw an error if formula already exists', async () => {
        const mockFormula = { formula: 'formula2' };
        const returnedFormula = { name: 'formula2', formula_id: 4 };
        sinon
            .stub(formulaModel, 'findOne')
            .returns(Promise.resolve(returnedFormula));
        expect(formulaService.newFormulaInsert(mockFormula)).rejects.toThrow();
    });
    it('Should find a formula by id', async () => {
        const mockFormula = { name: 'formula1', formula_id: 1 };
        sinon
            .stub(formulaModel, 'findOne')
            .returns(Promise.resolve(mockFormula));
        const formula = await formulaService.findFormulaById(1);
        expect(formula).toEqual(mockFormula);
    });
});
