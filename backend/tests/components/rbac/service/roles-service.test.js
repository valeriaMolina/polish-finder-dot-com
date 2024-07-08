const rolesService = require('../../../../src/components/rbac/service/roles-service');
const rolesModel = require('../../../../src/components/rbac/db/roles');
const userService = require('../../../../src/components/users/service/user-service');
const userRoleService = require('../../../../src/components/rbac/service/user-roles-service');
const sinon = require('sinon').createSandbox();

jest.mock('../../../../src/components/rbac/db/roles');
jest.mock('../../../../src/components/users/service/user-service');
jest.mock('../../../../src/components/rbac/service/user-roles-service');

describe('Test roles service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    afterEach(() => {
        sinon.restore();
    });
    it('Should find roles by name', async () => {
        const roleName = 'test';
        sinon
            .stub(rolesModel, 'findOne')
            .resolves({ name: roleName, role_id: 3 });
        const role = await rolesService.findRolesByName(roleName);
        expect(role.name).toBe(roleName);
    });
    it('Should fail assigning role due to user not being found', async () => {
        const data = {
            username: 'testUser',
            roleName: 'testRole',
        };
        userService.getUserByUsername.mockResolvedValue(null);
        expect(rolesService.assignRole(data)).rejects.toThrow();
    });

    it('Should fail assigning role due to role not being found', async () => {
        const data = {
            username: 'testUser',
            roleName: 'testRole',
        };
        userService.getUserByUsername.mockResolvedValue({
            user_id: 1,
            user_name: 'testUser',
        });
        sinon.stub(rolesModel, 'findOne').resolves(null);
        expect(rolesService.assignRole(data)).rejects.toThrow();
    });
    it('Should assign a role successfully', async () => {
        userRoleService.assignRoleToUser.mockResolvedValue({
            user_id: 1,
            role_id: 1,
        });
        const data = {
            username: 'testUser',
            roleName: 'testRole',
        };
        userService.getUserByUsername.mockResolvedValue({
            user_id: 1,
            user_name: 'testUser',
        });
        sinon.stub(rolesModel, 'findOne').resolves({ role_id: 1 });
        const newRole = await rolesService.assignRole(data);
        expect(newRole.user_id).toBe(1);
    });
    it('Should fail revoking role due to user not being found', async () => {
        const data = {
            username: 'testUser',
            roleName: 'testRole',
        };
        userService.getUserByUsername.mockResolvedValue(null);
        expect(rolesService.revokeRole(data)).rejects.toThrow();
    });
    it('Should fail revoking role due to role not being found', async () => {
        const data = {
            username: 'testUser',
            roleName: 'testRole',
        };
        userService.getUserByUsername.mockResolvedValue({
            user_id: 1,
            user_name: 'testUser',
        });
        sinon.stub(rolesModel, 'findOne').resolves(null);
        expect(rolesService.revokeRole(data)).rejects.toThrow();
    });
    it('Should successfully revoke a role', async () => {
        userRoleService.revokeRoleFromUser.mockResolvedValue();
        const data = {
            username: 'testUser',
            roleName: 'testRole',
        };
        userService.getUserByUsername.mockResolvedValue({
            user_id: 1,
            user_name: 'testUser',
        });
        sinon.stub(rolesModel, 'findOne').resolves({ role_id: 1 });
        await rolesService.revokeRole(data);
        expect(rolesService.revokeRole).toBeTruthy();
    });
});
