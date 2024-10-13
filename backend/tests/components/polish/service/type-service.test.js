const sinon = require('sinon');
const typeModel = require('../../../../src/components/polish/db/types');
const typeService = require('../../../../src/components/polish/service/type-service');

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
    it('should return a type by id', async () => {
        const mockType = { type_id: 1, name: 'mockType' };
        sinon.stub(typeModel, 'findOne').returns(Promise.resolve(mockType));

        const type = await typeService.findTypeById(1);
        expect(type).toEqual(mockType);
    });
});
