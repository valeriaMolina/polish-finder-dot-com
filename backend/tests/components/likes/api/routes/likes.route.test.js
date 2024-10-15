const request = require('supertest');
const express = require('express');
const likesRoute = require('../../../../../src/components/likes/api/routes/likes-route');
const likesService = require('../../../../../src/components/likes/service/likes-service');
const {
    UserLikeAlreadyExistsError,
    UserLikeDoesNotExistError,
} = require('../../../../../src/libraries/utils/error-handler');

jest.mock('../../../../../src/components/likes/service/likes-service');

const app = express();
app.use(express.json());
app.use('/', likesRoute);

describe('Likes route test', () => {
    afterAll(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });
    it('Responds with 200 status code', async () => {
        likesService.likePolish.mockResolvedValue({
            user_id: '1',
            polish_id: '7',
        });
        const res = await request(app).post('/like').send({
            email: 'email@email.com',
            polishId: '7',
        });
        expect(res.status).toBe(200);
    });
    it('Should send an error if the like already exists', async () => {
        likesService.likePolish.mockRejectedValue(
            new UserLikeAlreadyExistsError('User like already exists')
        );
        const res = await request(app).post('/like').send({
            email: 'email@mail.com',
            polishId: '7',
        });
        expect(res.status).toBe(400);
    });
    it('Should send 500 status if the error is not anticipated', async () => {
        likesService.likePolish.mockRejectedValue(new Error('Test error'));
        const res = await request(app).post('/like').send({
            email: 'test@example.com',
            polishId: '7',
        });
        expect(res.status).toBe(500);
    });
    it('Should receive a 400 status if the request is not valid', async () => {
        const res = await request(app).post('/like').send({});
        expect(res.status).toBe(400);
    });
    it('Should receive a 200 status if the unlike request is successful', async () => {
        likesService.unlikePolish.mockResolvedValue({
            user_id: '1',
            polish_id: '7',
        });
        const res = await request(app).post('/unlike').send({
            email: 'test@example.com',
            polishId: '7',
        });
        expect(res.status).toBe(200);
    });
    it('Should receive a 400 status if there is an error unliking', async () => {
        likesService.unlikePolish.mockRejectedValue(
            new UserLikeDoesNotExistError('User like does not exist')
        );
        const res = await request(app).post('/unlike').send({
            email: 'test@example.com',
            polishId: '7',
        });
        expect(res.status).toBe(404);
    });
    it('should return an internal server error when something goes wrong', async () => {
        likesService.unlikePolish.mockRejectedValue(new Error('Test error'));
        const res = await request(app).post('/unlike').send({
            email: 'test@example.com',
            polishId: '7',
        });
        expect(res.status).toBe(500);
    });
    it('Should return the likes from a certain user id', async () => {
        likesService.getUserLikes.mockResolvedValue({
            userId: '1',
            likes: ['4'],
        });
        const res = await request(app).get('/test@example.com/likes');
        expect(res.status).toBe(200);
    });
    it('should throw an error if something unexpected happens', async () => {
        likesService.getUserLikes.mockRejectedValue(new Error('Test error'));
        const res = await request(app).get('/test@example.com/likes');
        expect(res.status).toBe(500);
    });
    it('should return a 400 status if the user id is invalid', async () => {
        const res = await request(app).get('/_/likes');
        expect(res.status).toBe(400);
    });
});
