const sinon = require('sinon');
const typeModel = require('../../src/models/typeModel');
const typeService = require('../../src/services/typeService');

describe('typeService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should find type by name', async () => {
        const mockType = { name: 'mockType' };
        sinon.stub(typeModel, 'findOne').returns(Promise.resolve(mockType));

        const type = await typeService.findTypeByName('mockType');
        expect(type).toEqual(mockType);
    });

    it('should return null if type is not found', async () => {
        sinon.stub(typeModel, 'findOne').returns(Promise.resolve(null));

        const type = await typeService.findTypeByName('nonexistentType');
        expect(type).toBeNull();
    });
});
