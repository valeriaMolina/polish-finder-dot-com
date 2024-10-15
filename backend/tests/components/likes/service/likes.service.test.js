const sinon = require('sinon');
const likesModel = require('../../../../src/components/likes/db/likes');
const userModel = require('../../../../src/components/users/db/users');
const likesService = require('../../../../src/components/likes/service/likes-service');

describe('likesService', () => {
    afterEach(() => {
        sinon.restore();
    });
    it('Should like a polish', async () => {
        const email = 'test@example.com';
        const userId = 1;
        const polishId = 2;
        sinon.stub(userModel, 'findOne').returns({ user_id: userId });
        sinon.stub(likesModel, 'findOne').returns(Promise.resolve(null));
        sinon
            .stub(likesModel, 'create')
            .returns(Promise.resolve({ userId, polishId }));
        const like = await likesService.likePolish(email, polishId);
        expect(like).toEqual({ userId, polishId });
    });
    it('should throw an error if the like already exists', async () => {
        const email = 'test@example.com';
        const userId = 1;
        const polishId = 2;
        const existingLike = { userId, polishId };
        sinon.stub(userModel, 'findOne').returns({ user_id: userId });
        sinon
            .stub(likesModel, 'findOne')
            .returns(Promise.resolve(existingLike));
        expect(likesService.likePolish(email, polishId)).rejects.toThrow();
    });
    it('Should unlike a polish', async () => {
        const email = 'test@example.com';
        const userId = 1;
        const polishId = 2;
        const existingLike = { userId, polishId };
        sinon
            .stub(likesModel, 'findOne')
            .returns(Promise.resolve(existingLike));
        sinon.stub(likesModel, 'destroy').returns(Promise.resolve(null));
        sinon
            .stub(userModel, 'findOne')
            .returns(Promise.resolve({ user_id: 1 }));
        await expect(
            likesService.unlikePolish(email, polishId)
        ).resolves.toBeUndefined();
    });
    it('should throw an error if the like does not exist', async () => {
        const email = 'test@example.com';
        sinon
            .stub(userModel, 'findOne')
            .returns(Promise.resolve({ user_id: 1 }));
        sinon.stub(likesModel, 'findOne').returns(Promise.resolve(null));
        await expect(likesService.unlikePolish(email, 2)).rejects.toThrow();
    });
    it('Should find likes by userId', async () => {
        const email = 'test@example.com';
        sinon.stub(likesModel, 'findAll').returns(Promise.resolve([]));
        sinon
            .stub(userModel, 'findOne')
            .returns(Promise.resolve({ user_id: 1 }));
        const likes = await likesService.getUserLikes(email);
        expect(likes).toEqual([]);
    });
});
