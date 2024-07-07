const sinon = require('sinon');
const rolesPermissionsModel = require('../../../../src/components/rbac/db/roles-permissions');
const rolesPermissionService = require('../../../../src/components/rbac/service/roles-permissions-service');

describe('rolesPermissionsService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('Should find roles by role id', async () => {
        const roleId = 1;
        sinon
            .stub(rolesPermissionsModel, 'findAll')
            .returns(Promise.resolve([]));
        const roles = await rolesPermissionService.findRolesByRoleId(roleId);
        expect(roles).toEqual([]);
    });
});
