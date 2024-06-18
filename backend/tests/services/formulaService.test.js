const sinon = require('sinon');
const formulaModel = require('../../src/models/formulaModel');
const formulaService = require('../../src/services/formulaService');

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
});
