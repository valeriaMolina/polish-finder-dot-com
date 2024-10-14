const sinon = require('sinon').createSandbox();
const polishService = require('../../../../src/components/polish/service/polish-service');
const searchService = require('../../../../src/components/search/service/search-service');

jest.mock('../../../../src/components/polish/service/polish-service');

describe('polishService', () => {
    afterEach(() => {
        sinon.restore();
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    it('Should throw an error if no dupe exists', async () => {
        const polishId = 1;
        polishService.findPolishById.mockResolvedValue(null);
        expect(searchService.searchForDupe({ polishId })).rejects.toThrow();
    });
    it('Should throw an error if there are no dupes associated with the polish', async () => {
        const polishId = 4;
        polishService.findPolishById.mockResolvedValue({ dupes: [] });
        expect(searchService.searchForDupe({ polishId })).rejects.toThrow();
    });
    it('Should look for polish dupes', async () => {
        const polishId = 1;
        polishService.findPolishById.mockResolvedValue({ dupes: [3] });
        const mockDupes = await searchService.searchForDupe({ polishId });
        expect(mockDupes).toEqual([3]);
    });
    it('Should throw an error if no matches are found', async () => {
        const filters = {};
        polishService.search.mockResolvedValue([]);
        await expect(searchService.search(filters)).rejects.toThrow();
    });
    it('Should look for polish matches', async () => {
        const filters = {};
        polishService.search.mockResolvedValue([{ polish_id: 1 }]);
        const mockMatches = await searchService.search(filters);
        expect(mockMatches).toEqual([{ polish_id: 1 }]);
    });
});
