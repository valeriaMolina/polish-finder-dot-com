const sinon = require('sinon').createSandbox();
const polishService = require('../../../../src/components/polish/service/polish-service');
const searchService = require('../../../../src/components/search/service/search-service');

jest.mock('../../../../src/components/polish/service/polish-service');

describe('polishService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('Should look for polish dupes', async () => {
        const polishId = 1;
        polishService.findPolishById.mockResolvedValue({ dupes: [3] });
        const mockDupes = await searchService.searchForDupe({ polishId });
        expect(mockDupes).toEqual([3]);
    });
    it('Should look for polish matches', async () => {
        const filters = {};
        polishService.search.mockResolvedValue([{ polish_id: 1 }]);
        const mockMatches = await searchService.search(filters);
        expect(mockMatches).toEqual([{ polish_id: 1 }]);
    });
});
