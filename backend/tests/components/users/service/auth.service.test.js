const sinon = require('sinon');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = require('../../../../src/components/users/service/user-service');

const authService = require('../../../../src/components/users/service/auth-service');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../../../src/components/users/service/user-service');

describe('authService', () => {
    afterEach(() => {
        sinon.restore();
    });
    it('Should log in a user', async () => {
        userService.getUserByUsernameOrEmail.mockResolvedValue({
            user_id: '2',
            email_verified: true,
        });
        bcrypt.compare.mockResolvedValue(true);
        userService.saveRefreshToken.mockResolvedValue();
        const result = await authService.logInUser({
            identifier: 'usr',
            password: 'pwd',
        });
        expect(result).toEqual(expect.anything());
    });
    it('Should throw an error when user not found', async () => {
        userService.getUserByUsernameOrEmail.mockResolvedValue(null);
        await expect(
            authService.logInUser({ identifier: 'usr', password: 'pwd' })
        ).rejects.toThrow();
    });
    it('should log out a user', async () => {
        const user = {
            user_id: '2',
        };
        userService.getUserByRefreshToken.mockResolvedValue(user);
        userService.removeRefreshToken.mockResolvedValue();
        await authService.logOutUser('refreshToken');
        expect(userService.removeRefreshToken).toHaveBeenCalledWith(
            user.user_id
        );
    });
    it('should throw an error when user not found', async () => {
        userService.getUserByRefreshToken.mockResolvedValue(null);
        await expect(authService.logOutUser('refreshToken')).rejects.toThrow();
    });
});
