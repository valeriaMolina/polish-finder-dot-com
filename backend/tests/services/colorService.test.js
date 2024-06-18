const sinon = require('sinon');
const colorModel = require('../../src/models/colorModel');
const colorService = require('../../src/services/colorService');

describe('colorService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should find color by name', async () => {
        const mockColor = { name: 'red', value: '#FF0000' };
        sinon.stub(colorModel, 'findOne').returns(Promise.resolve(mockColor));

        const color = await colorService.findColorByName('red');
        expect(color).toEqual(mockColor);
    });

    it('should return null if color is not found', async () => {
        sinon.stub(colorModel, 'findOne').returns(Promise.resolve(null));

        const color = await colorService.findColorByName('nonexistent');
        expect(color).toBeNull();
    });
});
