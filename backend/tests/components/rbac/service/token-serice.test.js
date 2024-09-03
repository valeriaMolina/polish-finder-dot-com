const sinon = require('sinon').createSandbox();
const tokenModel = require('../../../../src/components/users/db/tokens');
const tokenService = require('../../../../src/components/users/service/token-service');

describe('tokenService', () => {
    afterEach(() => {
        sinon.restore();
    });
    it('Should find token by user id', async () => {
        const mockToken = { user_id: 1, token_hash: 'testToken' };
        sinon.stub(tokenModel, 'findOne').returns(Promise.resolve(mockToken));
        const token = await tokenService.findTokenByUserId(1);
        expect(token).toEqual(mockToken);
    });
    it('Should delete a token by user id', async () => {
        const userId = 1;
        sinon.stub(tokenModel, 'destroy').returns(Promise.resolve());
        await tokenService.deleteTokenByUserId(userId);
        expect(tokenService.deleteTokenByUserId).toBeTruthy();
    });
    it('should insert a new token', async () => {
        const mockToken = { user_id: 1, token_hash: 'testToken' };
        sinon.stub(tokenModel, 'create').returns(Promise.resolve(mockToken));
        await tokenService.insertNewToken(mockToken);
        expect(tokenService.insertNewToken).toBeTruthy();
    });
});
