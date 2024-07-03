const sinon = require('sinon');
const userModel = require('../../../../src/components/users/db/users');
const userService = require('../../../../src/components/users/service/user-service');

describe('userService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should return a user if the user id exists', async () => {
        const mockUser = { username: 'mockUser', user_id: '123' };
        sinon.stub(userModel, 'findOne').returns(Promise.resolve(mockUser));

        const user = await userService.getUserByUserId('123');
        expect(user).toEqual(mockUser);
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

    it('should return user if user exists', async () => {
        const mockUser = { username: 'mockUser', user_id: '123' };
        sinon.stub(userModel, 'findOne').returns(Promise.resolve(mockUser));

        const user = await userService.getUserByUsername('mockUser');
        expect(user.user_id).toEqual('123');
        expect(user.username).toEqual('mockUser');
    });

    it('should throw error if user does not exist', async () => {
        sinon.stub(userModel, 'findOne').returns(Promise.resolve(null));

        const invalidUser =
            await userService.getUserByUsername('nonexistentUser');
        expect(invalidUser).toBeNull();
    });

    it('should return user if email is in database', async () => {
        const mockUser = {
            username: 'mockUser',
            user_id: '123',
            email: 'mockEmail',
        };
        sinon.stub(userModel, 'findOne').returns(Promise.resolve(mockUser));

        const user = await userService.getUserByEmail('mockEmail');
        expect(user.user_id).toEqual('123');
        expect(user.username).toEqual('mockUser');
        expect(user.email).toEqual('mockEmail');
    });
    it('should throw error if email is not in database', async () => {
        sinon.stub(userModel, 'findOne').returns(Promise.resolve(null));

        const invalidUser =
            await userService.getUserByEmail('nonexistentEmail');
        expect(invalidUser).toBeNull();
    });
    it('should return user if identifier is valid', async () => {
        const mockUser = {
            username: 'mockUser',
            user_id: '123',
            email: 'mockEmail',
        };
        sinon.stub(userModel, 'findOne').returns(Promise.resolve(mockUser));
        const user = await userService.getUserByUsernameOrEmail('mockUser');
        expect(user.user_id).toEqual('123');
        expect(user.username).toEqual('mockUser');
        expect(user.email).toEqual('mockEmail');
    });
    it('should throw error if identifier is invalid', async () => {
        sinon.stub(userModel, 'findOne').returns(Promise.resolve(null));

        const invalidUser =
            await userService.getUserByUsernameOrEmail('nonexistentUser');
        expect(invalidUser).toBeNull();
    });
    it('Should create and return a valid user', async () => {
        const mockUser = {
            username: 'usr',
            email: 'email',
            password: 'pwd',
        };
        sinon.stub(userModel, 'create').returns(Promise.resolve(mockUser));
        const user = await userService.createUser('usr', 'email', 'pwd');
        expect(user.username).toEqual('usr');
        expect(user.email).toEqual('email');
    });
    it('Should save the refresh token', async () => {
        const userId = '123';
        const refreshToken = 'refreshToken';
        sinon.stub(userModel, 'findOne').returns(
            Promise.resolve({
                user_id: userId,
                refreshtoken: 'refreshToken',
                save: jest.fn(),
            })
        );
        await userService.saveRefreshToken(userId, refreshToken);
        expect(userModel.findOne.calledOnce).toBeTruthy();
    });
    it('Should throw an error if the refresh token is invalid', async () => {
        const userId = '123';
        const refreshToken = 'null';
        sinon.stub(userModel, 'findOne').returns(Promise.reject(new Error()));
        expect(
            userService.saveRefreshToken(userId, refreshToken)
        ).rejects.toThrow();
    });
    it('Should get the user by refresh token', async () => {
        const userId = '123';
        const refreshToken = 'null';
        sinon.stub(userModel, 'findOne').returns(
            Promise.resolve({
                user_id: userId,
                refreshtoken: refreshToken,
            })
        );
        const user = await userService.getUserByRefreshToken(refreshToken);
        expect(user.user_id).toEqual(userId);
        expect(user.refreshtoken).toEqual(refreshToken);
    });
    it('Should throw an error if the refresh token is invalid', async () => {
        sinon.stub(userModel, 'findOne').returns(Promise.resolve(null));
        const invalidUser = await userService.getUserByRefreshToken('null');
        expect(invalidUser).toBeNull();
    });
    it('Should remove refresh token', async () => {
        const userId = '123';
        sinon.stub(userModel, 'findOne').returns(
            Promise.resolve({
                user_id: userId,
                refreshtoken: 'null',
                save: jest.fn(),
            })
        );
        await userService.removeRefreshToken(userId);
        expect(userModel.findOne.calledOnce).toBeTruthy();
    });
    it('Should throw an error if the refresh token is invalid', async () => {
        const badUser = 'null';
        sinon.stub(userModel, 'findOne').returns(Promise.reject(new Error()));
        expect(userService.removeRefreshToken(badUser)).rejects.toThrow();
    });
});
