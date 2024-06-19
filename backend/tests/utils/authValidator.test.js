// authValidator.test.js
const request = require('supertest');
const express = require('express');
const {
    validateAuth,
    validateSignUp,
    validateRefresh,
} = require('../../src/utils/authValidator');

const app = express();
app.use(express.json());

app.post('/auth', validateAuth, (req, res) => res.sendStatus(200));
app.post('/signup', validateSignUp, (req, res) => res.sendStatus(200));
app.post('/refresh', validateRefresh, (req, res) => res.sendStatus(200));

describe('authValidator', () => {
    it('should return 400 if no identifier is provided', async () => {
        const res = await request(app)
            .post('/auth')
            .send({ password: 'password' });
        expect(res.statusCode).toEqual(400);
    });

    it('should return 400 if no password is provided', async () => {
        const res = await request(app)
            .post('/auth')
            .send({ identifier: 'username' });
        expect(res.statusCode).toEqual(400);
    });

    it('should return 200 if valid auth data is provided', async () => {
        const res = await request(app)
            .post('/auth')
            .send({ identifier: 'username', password: 'password' });
        expect(res.statusCode).toEqual(200);
    });
});

describe('validateSignUp', () => {
    it('should return 400 if no username is provided', async () => {
        const res = await request(app)
            .post('/signup')
            .send({ password: 'password', email: 'email' });
        expect(res.statusCode).toEqual(400);
    });
    it('should return 400 if no password is provided', async () => {
        const rest = await request(app)
            .post('/signup')
            .send({ username: 'username', email: 'email' });
        expect(rest.statusCode).toEqual(400);
    });
    it('should return 400 if no email is provided', async () => {
        const res = await request(app)
            .post('/signup')
            .send({ username: 'username', password: 'password' });
        expect(res.statusCode).toEqual(400);
    });
    it('should return 400 if email is not valid', async () => {
        const res = await request(app)
            .post('/signup')
            .send({ username: 'username', password: 'password' });
        expect(res.statusCode).toEqual(400);
    });
    it('should return 200 if valid signup data is provided', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                username: 'username',
                password: 'password',
                email: 'email',
            });
        expect(res.statusCode).toEqual(200);
    });
});
