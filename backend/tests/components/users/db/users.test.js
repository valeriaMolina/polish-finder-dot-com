const sinon = require('sinon');
const User = require('../../../../src/components/users/db/users');

describe('User Model', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should have correct model name', () => {
        expect(User.name).toEqual('users');
    });

    it('should have correct fields', () => {
        const user = User.build();
        expect(user).toHaveProperty('user_id');
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('password_hash');
    });

    it('should have correct validation', async () => {
        const user = User.build({ username: '', email: '', password_hash: '' });
        return expect(user.validate()).rejects.toThrow();
    });

    it('should validate email format', async () => {
        const user = User.build({ email: 'notanemail' });
        await expect(user.validate()).rejects.toThrow();
    });
});
