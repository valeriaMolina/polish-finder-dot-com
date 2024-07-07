const sinon = require('sinon');
const userRolesModel = require('../../../../src/components/rbac/db/user-roles');
const userRolesService = require('../../../../src/components/rbac/service/user-roles-service');

describe('userRolesService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('Should find user roles by user id', async () => {
        const mockUserRoles = { user_id: 1 };
        sinon
            .stub(userRolesModel, 'findAll')
            .returns(Promise.resolve(mockUserRoles));

        const userRoles = await userRolesService.findUserRolesByUserId(1);
        expect(userRoles).toEqual(mockUserRoles);
    });

    it('Should assign a role to a user', async () => {
        const userId = 1;
        const roleId = 2;
        const mockUserRole = {
            user_id: userId,
            role_id: roleId,
            save: () => Promise.resolve(),
        };
        sinon
            .stub(userRolesModel, 'findOrCreate')
            .returns(Promise.resolve([mockUserRole, false]));
        const newUserRole = await userRolesService.assignRoleToUser(
            userId,
            roleId
        );
        expect(newUserRole).toEqual(mockUserRole);
    });
});
