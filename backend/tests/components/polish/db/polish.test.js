const sinon = require('sinon');
const Polish = require('../../../../src/components/polish/db/polishes');
describe('Polish Model', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should have correct model name', () => {
        expect(Polish.name).toEqual('polishes');
    });

    it('should have correct fields', () => {
        const polish = Polish.build();
        expect(polish).toHaveProperty('polish_id');
        expect(polish).toHaveProperty('effect_colors');
        expect(polish).toHaveProperty('formula_ids');
        expect(polish).toHaveProperty('name');
        expect(polish).toHaveProperty('description');
        expect(polish).toHaveProperty('dupes');
    });

    it('should have correct validation', () => {
        const polish = Polish.build({ name: '', description: '' });
        polish.validate().then((msg) => {
            expect(msg).toBeDefined();
        });
    });

    it('should have associations', () => {
        expect(Polish.associations).toHaveProperty('brand');
        expect(Polish.associations).toHaveProperty('type');
    });
});
