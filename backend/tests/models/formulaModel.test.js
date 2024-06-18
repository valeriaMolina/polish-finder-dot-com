const sinon = require('sinon');
const Sequelize = require('sequelize');
const db = require('../../src/config/database');
const Formula = require('../../src/models/formulaModel');

describe('Formula Model', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should have correct model name', () => {
        expect(Formula.name).toEqual('formulas');
    });

    it('should have correct fields', () => {
        const formula = Formula.build();
        expect(formula).toHaveProperty('formula_id');
        expect(formula).toHaveProperty('name');
    });

    it('should have correct validation', () => {
        const formula = Formula.build({ name: '' });
        formula.validate().then((msg) => {
            expect(msg).toBeDefined();
        });
    });
});
