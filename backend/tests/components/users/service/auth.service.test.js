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
        });
        bcrypt.compare.mockResolvedValue(true);
        userService.saveRefreshToken.mockResolvedValue();
        const result = await authService.logInUser({
            identifier: 'usr',
            password: 'pwd',
        });
        expect(result).toEqual(expect.anything());
    });
});
