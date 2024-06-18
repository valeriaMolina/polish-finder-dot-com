const sinon = require('sinon');
const Type = require('../../src/models/typeModel');

describe('Type Model', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should have correct model name', () => {
        expect(Type.name).toEqual('types');
    });

    it('should have correct fields', () => {
        const type = Type.build();
        expect(type).toHaveProperty('type_id');
        expect(type).toHaveProperty('name');
    });

    it('should have correct validation', () => {
        const type = Type.build({ name: '' });
        type.validate().then((msg) => {
            expect(msg).toBeDefined();
        });
    });
});
