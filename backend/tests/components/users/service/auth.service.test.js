const sinon = require('sinon');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const emailService = require('../../../../src/components/users/service/email-service');
const userService = require('../../../../src/components/users/service/user-service');
const userRoleService = require('../../../../src/components/rbac/service/user-roles-service');
const rolesService = require('../../../../src/components/rbac/service/roles-service');
const tokenService = require('../../../../src/components/users/service/token-service');
const roles = require('../../../../src/libraries/constants/roles');

const authService = require('../../../../src/components/users/service/auth-service');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../../../src/components/users/service/email-service');
jest.mock('../../../../src/components/users/service/user-service');
jest.mock('../../../../src/components/rbac/service/user-roles-service');
jest.mock('../../../../src/components/rbac/service/roles-service');
jest.mock('../../../../src/components/users/service/token-service');

describe('authService', () => {
    afterEach(() => {
        sinon.restore();
        jest.restoreAllMocks();
    });
    it('should register a user', async () => {
        const userDetails = {
            username: 'usr',
            email: 'usr@example.com',
            password: 'pwd',
        };

        const newUser = {
            user_id: '2',
            username: 'usr',
            email: 'usr@example.com',
            email_verified: false,
        };
        userService.getUserByUsername.mockResolvedValue(null);
        userService.getUserByEmail.mockResolvedValue(null);
        userService.createUser.mockResolvedValue(newUser);
        rolesService.findRolesByName.mockResolvedValue('USER_ROLE');
        userRoleService.assignRoleToUser.mockResolvedValue({
            user_id: '2',
            role_id: '1',
        });
        jwt.sign.mockResolvedValue(Promise.resolve());

        const result = await authService.registerUser(userDetails);
        expect(result).toEqual({
            accessToken: Promise.resolve(),
            refreshToken: Promise.resolve(),
            userName: userDetails.username,
            userEmail: userDetails.email,
            verificationToken: Promise.resolve(),
        });
    });
    it('should throw an error when user already exists', async () => {
        userService.getUserByUsername.mockResolvedValue({ username: 'usr' });
        await expect(
            authService.registerUser({
                username: 'usr',
                email: 'usr@example.com',
                password: 'pwd',
            })
        ).rejects.toThrow();
    });
    it('should throw an error when email is already in use', async () => {
        userService.getUserByUsername.mockResolvedValue(null);
        userService.getUserByEmail.mockResolvedValue({
            username: 'usr',
            email: 'usr@example.com',
        });
        await expect(
            authService.registerUser({
                username: 'usr',
                email: 'usr@example.com',
                password: 'pwd',
            })
        ).rejects.toThrow();
    });
    it('should throw an error when there is an error assigning a role', async () => {
        userService.getUserByUsername.mockResolvedValue(null);
        userService.getUserByEmail.mockResolvedValue(null);
        userService.createUser.mockResolvedValue({
            user_id: '2',
            username: 'usr',
            email: 'usr@example.com',
            email_verified: false,
        });
        rolesService.findRolesByName.mockResolvedValue('USER_ROLE');
        userRoleService.assignRoleToUser.mockResolvedValue(null);
        await expect(
            authService.registerUser({
                username: 'usr',
                email: 'usr@example.com',
                password: 'pwd',
            })
        ).rejects.toThrow();
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
    it('should verify a user', async () => {
        const token = 'token';
        jwt.verify.mockReturnValue({ user: { id: '3' } });
        userService.getUserByUserId.mockResolvedValue({
            user_id: '3',
            email_verified: false,
            save: () => Promise.resolve(),
        });
        await authService.verifyUser(token);
        expect(userService.getUserByUserId).toHaveBeenCalledWith('3');
    });
    it('Should throw an error if token is malformed', async () => {
        const token = 'invalidToken';
        jwt.verify.mockImplementation(() => {
            throw new Error('jwt malformed');
        });
        await expect(authService.verifyUser(token)).rejects.toThrow();
    });
    it('should throw an error when token is invalid', async () => {
        const token = 'invalidToken';
        jwt.verify.mockImplementation(() => {
            return {
                user: { id: null },
            };
        });
        await expect(authService.verifyUser(token)).rejects.toThrow();
    });
    it('should throw an error when the user is not found', async () => {
        const token = 'token';
        jwt.verify.mockReturnValue({ user: { id: '3' } });
        userService.getUserByUserId.mockResolvedValue(null);
        await expect(authService.verifyUser(token)).rejects.toThrow();
    });
    it('should throw an error when the email is already verified', async () => {
        const token = 'token';
        jwt.verify.mockReturnValue({ user: { id: '3' } });
        userService.getUserByUserId.mockResolvedValue({
            user_id: '3',
            email_verified: true,
        });
        await expect(authService.verifyUser(token)).rejects.toThrow();
    });
    it('should throw an error if the token expired', async () => {
        const token = 'token';
        jwt.verify.mockImplementation(() => {
            throw new Error('jwt expired');
        });
        await expect(authService.verifyUser(token)).rejects.toThrow();
    });
    it('should generate a new verification email', async () => {
        const user = {
            user_id: '3',
            username: 'testUser',
            email: 'test@example.com',
            email_verified: false,
        };
        userService.getUserByEmail.mockResolvedValue(user);
        jwt.sign.mockImplementation(() => {
            return 'signedToken';
        });
        emailService.sendAccountVerificationEmail.mockResolvedValue();
        await authService.resendVerificationEmail(user.email);
        expect(emailService.sendAccountVerificationEmail).toHaveBeenCalledWith(
            user.email,
            user.username,
            'signedToken'
        );
    });
    it('should generate a user not found error if user not found', async () => {
        userService.getUserByEmail.mockResolvedValue(null);
        await expect(
            authService.resendVerificationEmail('test@example.com')
        ).rejects.toThrow();
    });
    it('should generate a user already verified error if user is already verified', async () => {
        const user = {
            user_id: '3',
            username: 'testUser',
            email: 'test@example.com',
            email_verified: true,
        };
        userService.getUserByEmail.mockResolvedValue(user);
        await expect(
            authService.resendVerificationEmail('test@example.com')
        ).rejects.toThrow();
    });
    it('should generate a password reset token', async () => {
        const user = {
            user_id: '3',
            username: 'testUser',
            email: 'test@example.com',
            email_verified: true,
        };
        const identifier = 'testUser';
        userService.getUserByUsernameOrEmail.mockResolvedValue(user);
        tokenService.findTokenByUserId.mockResolvedValue(null);
        jwt.sign.mockResolvedValue('signedToken');

        const result = await authService.passwordReset(identifier);
        expect(result.email).toEqual(user.email);
    });
    it('Should throw an error if user not found', async () => {
        userService.getUserByUsernameOrEmail.mockResolvedValue(null);
        await expect(authService.passwordReset('testUser')).rejects.toThrow();
    });
});
