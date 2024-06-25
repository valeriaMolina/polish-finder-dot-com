const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('../../src/routers/authRouter');
const userService = require('../../src/services/userService');
const config = require('../../src/config/config');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../src/services/userService');

const app = express();
app.use(express.json());
app.use('/', router);

describe('POST /auth', () => {
    const validIdentifier = 'testUser';
    const validPassword = 'testPassword';
    const validUserId = 1;
    const validRefreshToken = 'validRefreshToken';
    const validJwtToken = 'validJwtToken';
    const validUser = {
        user_id: validUserId,
        username: 'testUser',
        email: 'mail@mail.com',
        refreshToken: validRefreshToken,
        password_hash: 'hashedPassword',
    };
    const mockPayload = {
        user: {
            id: validUserId,
        },
    };

    beforeEach(() => {
        userService.getUserId.mockResolvedValue(validUser);
        bcrypt.compare.mockResolvedValue(true);
        userService.saveRefreshToken.mockResolvedValue(null);
        jwt.sign.mockReturnValue(validJwtToken);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('It should authenticate user with valid credentials', async () => {
        const response = await request(app)
            .post('/auth')
            .send({ identifier: validIdentifier, password: validPassword });

        expect(response.status).toBe(200);
    });
    test('It should return 400 status when user is not found', async () => {
        userService.getUserId.mockResolvedValue(null);

        const response = await request(app)
            .post('/auth')
            .send({ identifier: validIdentifier, password: validPassword });

        expect(response.status).toBe(400);
    });
    test('It shoould return 400 status when password does not match', async () => {
        bcrypt.compare.mockResolvedValue(false);

        const response = await request(app)
            .post('/auth')
            .send({ identifier: validIdentifier, password: validPassword });

        expect(response.status).toBe(400);
    });
});

describe('POST /signup', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const newUsername = 'newUser';
    const newEmail = 'email@mail.com';
    const password = 'password';
    const newUser = {
        user_id: 4,
        username: newUsername,
        email: newEmail,
        password_hash: password,
    };

    test('It should create a new user', async () => {
        userService.getUserByUsername.mockResolvedValue(null);
        userService.getUserByEmail.mockResolvedValue(null);
        userService.createUser.mockResolvedValue(newUser);

        const response = await request(app)
            .post('/signup')
            .send({ username: newUsername, email: newEmail, password });
        expect(response.status).toBe(201);
    });

    test('It should return 400 with an existing username', async () => {
        userService.getUserByUsername.mockResolvedValue(newUser);

        const response = await request(app)
            .post('/signup')
            .send({ username: newUsername, email: newEmail, password });
        expect(response.status).toBe(400);
    });

    test('It should return 400 with an existing email', async () => {
        userService.getUserByEmail.mockResolvedValue(newUser);

        const response = await request(app)
            .post('/signup')
            .send({ username: newUsername, email: newEmail, password });
        expect(response.status).toBe(400);
    });
});

describe('POST /refresh', () => {
    const user = {
        user_id: 4,
        username: 'user',
        email: 'newEmail',
        password_hash: 'password',
    };
    const refreshToken = 'refresh';
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('It should return a new JWT token', async () => {
        jwt.sign.mockReturnValue('validJwtToken');
        userService.getUserByRefreshToken.mockResolvedValue(user);

        const response = await request(app)
            .post('/refresh')
            .send({ refreshToken });
        expect(response.status).toBe(200);
    });

    test('It should return 400 if the refresh token is invalid', async () => {
        userService.getUserByRefreshToken.mockResolvedValue(null);

        const response = await request(app)
            .post('/refresh')
            .send({ refreshToken });
        expect(response.status).toBe(400);
    });
});

describe('POST /logout', () => {
    const user = {
        user_id: 4,
        username: 'user',
        email: 'newEmail',
        password_hash: 'password',
    };
    const refreshToken = 'refresh';
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('It should return a new JWT token', async () => {
        jwt.sign.mockReturnValue('validJwtToken');
        userService.getUserByRefreshToken.mockResolvedValue(user);

        const response = await request(app)
            .post('/logout')
            .send({ refreshToken });
        expect(response.status).toBe(200);
    });

    test('It should return 400 status is JWT is invalid', async () => {
        userService.getUserByRefreshToken.mockResolvedValue(null);

        const response = await request(app)
            .post('/logout')
            .send({ refreshToken });
        expect(response.status).toBe(400);
    });
});
