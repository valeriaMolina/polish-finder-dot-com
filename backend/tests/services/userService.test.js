const sinon = require('sinon');
const userModel = require('../../src/models/userModel');
const userService = require('../../src/services/userService');

describe('userService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should return user id if user exists', async () => {
        const mockUser = { username: 'mockUser', user_id: '123' };
        sinon.stub(userModel, 'findOne').returns(Promise.resolve(mockUser));

        const userId = await userService.getUserId('mockUser');
        expect(userId.user_id).toEqual('123');
    });

    it('should return null if user does not exist', async () => {
        sinon.stub(userModel, 'findOne').returns(Promise.resolve(null));

        const userId = await userService.getUserId('nonexistentUser');
        expect(userId).toBeNull();
    });
});
