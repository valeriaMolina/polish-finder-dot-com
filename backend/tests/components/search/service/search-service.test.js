const sinon = require('sinon');
const polishService = require('../../../../src/components/polish/service/polish-service');
const searchService = require('../../../../src/components/search/service/search-service');

jest.mock('../../../../src/components/polish/service/polish-service');

describe('polishService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('Should look for polishes', async () => {
        const polishId = 1;
        polishService.findPolishById.mockResolvedValue({ dupes: [3] });
        const mockDupes = await searchService.search({ polishId });
        expect(mockDupes).toEqual([3]);
    });
});
