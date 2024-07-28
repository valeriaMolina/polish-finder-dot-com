const sinon = require('sinon');
const colorModel = require('../../../../src/components/polish/db/colors');
const colorService = require('../../../../src/components/polish/service/color-service');

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

    it('Should find all colors', async () => {
        const mockColors = [
            { name: 'red', value: '#FF0000' },
            { name: 'blue', value: '#0000FF' },
        ];
        sinon.stub(colorModel, 'findAll').returns(Promise.resolve(mockColors));

        const colors = await colorService.getAllColors();
        expect(colors).toEqual(mockColors);
    });

    it('New Color Insert mock', async () => {
        const mockColor = { name: 'green', value: '#00FF00' };

        sinon.stub(colorModel, 'findOne').returns(Promise.resolve(null));
        sinon.stub(colorModel, 'create').returns(Promise.resolve(mockColor));

        const color = await colorService.newColorInsert({ name: 'green' });
        expect(color).toEqual(mockColor);
    });
});
