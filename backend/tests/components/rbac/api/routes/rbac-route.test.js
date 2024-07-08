const express = require('express');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const rbacRoute = require('../../../../../src/components/rbac/api/routes/rbac-route');
const rolesService = require('../../../../../src/components/rbac/service/roles-service');
const userService = require('../../../../../src/components/users/service/user-service');
const middleware = require('../../../../../src/components/rbac/api/middleware/rbac-middeware');

jest.mock('../../../../../src/components/rbac/service/roles-service');
jest.mock('../../../../../src/components/rbac/api/middleware/rbac-middeware');
jest.mock('../../../../../src/components/users/service/user-service');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/', rbacRoute);

jest.mock(
    '../../../../../src/components/rbac/api/middleware/rbac-middeware',
    () => ({
        authenticateToken: jest.fn((req, res, next) => next()),
        authorize: jest.fn((permission) => (req, res, next) => next()),
    })
);

describe('RBAC routes', () => {
    beforeEach(() => {
        middleware.authenticateToken.mockClear();
        middleware.authorize.mockClear();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('Should assign a role', async () => {
        rolesService.assignRole.mockResolvedValue({ user_id: 1, role_id: 1 });

        const newRole = {
            userName: 'USER',
            roleName: 'User role',
        };

        const response = await request(app).post('/assign').send(newRole);
        expect(response.status).toBe(201);
    });
    it('Should return throw an error when something goes wrong assigning', async () => {
        rolesService.assignRole.mockRejectedValue(new Error('Test error'));

        const newRole = {
            userName: 'USER',
            roleName: 'User role',
        };

        const response = await request(app).post('/assign').send(newRole);
        expect(response.status).toBe(500);
    });
    it('should revoke a role', async () => {
        const revoke = {
            userName: 'USER',
            roleName: 'User role',
        };
        const response = await request(app).post('/revoke').send(revoke);
        expect(response.status).toBe(200);
    });
    it('Should throw an error when revoking a role', async () => {
        rolesService.revokeRole.mockRejectedValue(new Error('Test error'));
        const revoke = {
            userName: 'USER',
            roleName: 'User role',
        };
        const response = await request(app).post('/revoke').send(revoke);
        expect(response.status).toBe(500);
    });
});
