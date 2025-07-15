const jwt = require('jsonwebtoken');
const {
    authenticateToken,
    authorize,
} = require('../../../../../src/components/rbac/api/middleware/rbac-middeware');
const userService = require('../../../../../src/components/users/service/user-service');
const userRolesService = require('../../../../../src/components/rbac/service/user-roles-service');
const rolesPermissionsService = require('../../../../../src/components/rbac/service/roles-permissions-service');
const config = require('../../../../../src/libraries/config/config');

jest.mock('jsonwebtoken');
jest.mock('../../../../../src/components/users/service/user-service');
jest.mock('../../../../../src/components/rbac/service/user-roles-service');
jest.mock(
    '../../../../../src/components/rbac/service/roles-permissions-service'
);

describe('Authenticate token test', () => {
    const validUser = {
        user_id: 3,
        username: 'testUser',
        email: 'mail@mail.com',
        refreshToken: 'validRefreshToken',
        password_hash: 'hashedPassword',
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
    };
    const next = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });
    it('Should succesfully authenticate user', async () => {
        jwt.verify.mockResolvedValue(validUser);
        const validToken = jwt.sign(validUser, config.jwtSecret);
        const req = {
            body: {},
            headers: {
                authorization: `Bearer ${validToken}`,
            },
            cookies: {},
        };

        await authenticateToken(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
    });
    it('Should return 401 status when no token is provided', async () => {
        const req = {
            body: {},
            headers: {},
            cookies: {},
        };

        await authenticateToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
    });
    it('Should return 403 status when token is invalid', async () => {
        jwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });
        const req = {
            body: {},
            headers: {
                authorization: 'Bearer invalidToken',
            },
            cookies: {},
        };
        await authenticateToken(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
    });
    it('Authorize will return status 400 when user is not found', async () => {
        userService.getUserByUserId.mockResolvedValue(null);
        const req = {
            body: {
                user: {
                    user: {
                        id: 1,
                    },
                },
            },
        };
        await authorize('test')(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
    });
    it('Authorize will return status 403 when user does not have required role', async () => {
        userService.getUserByUserId.mockResolvedValue({ user_id: 2 });
        userRolesService.findUserRolesByUserId.mockResolvedValue([]);
        const req = {
            body: {
                user: {
                    user: {
                        id: 2,
                    },
                },
            },
        };
        await authorize('test')(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
    });
    it('Should not authorize user when user role does not match requirement', async () => {
        const req = {
            body: {
                user: {
                    user: {
                        id: 2,
                    },
                },
            },
        };
        userService.getUserByUserId.mockResolvedValue({ user_id: 2 });
        userRolesService.findUserRolesByUserId.mockResolvedValue([
            { role_id: 1 },
        ]);
        rolesPermissionsService.findPermissionsByRoleId.mockResolvedValue([]);
        await authorize('test')(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
    });
    it('Should authorize user when user role matches requirement', async () => {
        const req = {
            body: {
                user: {
                    user: {
                        id: 2,
                    },
                },
            },
        };
        userService.getUserByUserId.mockResolvedValue({ user_id: 2 });
        userRolesService.findUserRolesByUserId.mockResolvedValue([
            { role_id: 1 },
        ]);
        rolesPermissionsService.findPermissionsByRoleId.mockResolvedValue([
            { role_id: 1, permission_name: 'test' },
        ]);
        await authorize('test')(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });
});
