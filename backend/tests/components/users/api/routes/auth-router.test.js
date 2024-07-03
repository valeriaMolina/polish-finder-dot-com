const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authRouter = require('../../../../../src/components/users/api/routes/auth-router');
const userService = require('../../../../../src/components/users/service/user-service');
const rolesService = require('../../../../../src/components/rbac/service/roles-service');
const userRolesService = require('../../../../../src/components/rbac/service/user-roles-service');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../../../../src/components/users/service/user-service');
jest.mock('../../../../../src/components/rbac/service/roles-service');
jest.mock('../../../../../src/components/rbac/service/user-roles-service');

const app = express();
app.use(express.json());
app.use('/', authRouter);

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
    const newUsername = 'newUser';
    const newEmail = 'email@mail.com';
    const password = 'password';
    const newUser = {
        user_id: 4,
        username: newUsername,
        email: newEmail,
        password_hash: password,
    };
    const mockRole = {
        role_id: 1,
        name: 'USER',
        description: 'User role',
    };
    const mockUserRole = {
        user_id: 4,
        role_id: 1,
    };
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('It should create a new user', async () => {
        userService.createUser.mockResolvedValue(newUser);
        userService.getUserByUsername.mockResolvedValue(null);
        userService.getUserByEmail.mockResolvedValue(null);
        rolesService.findRolesByName.mockResolvedValue(mockRole);
        userRolesService.assignRoleToUser.mockResolvedValue(mockUserRole);
        const response = await request(app)
            .post('/signup')
            .send({ username: newUsername, email: newEmail, password: 123 });

        expect(response.status).toBe(201);
    });

    test('It should return 400 status when user already exists', async () => {
        userService.getUserByUsername.mockResolvedValue(newUser);
        const response = await request(app)
            .post('/signup')
            .send({ username: newUsername, email: newEmail, password: 123 });
        expect(response.status).toBe(400);
    });

    test('It should return 400 status when email already exists', async () => {
        userService.getUserByEmail.mockResolvedValue(newUser);
        const response = await request(app)
            .post('/signup')
            .send({ username: newUsername, email: newEmail, password: 123 });
        expect(response.status).toBe(400);
    });

    test('It should return 500 if error when assigning role to user', async () => {
        userService.createUser.mockResolvedValue(newUser);
        userService.getUserByUsername.mockResolvedValue(null);
        userService.getUserByEmail.mockResolvedValue(null);
        rolesService.findRolesByName.mockResolvedValue(mockRole);
        userRolesService.assignRoleToUser.mockResolvedValue(null);
        const response = await request(app)
            .post('/signup')
            .send({ username: newUsername, email: newEmail, password: 123 });
        expect(response.status).toBe(500);
    });
});

describe('POST /refresh', () => {
    const user = {
        user_id: 4,
        username: 'user',
        email: 'newEmail',
        password_hash: 'password',
    };
    const refreshToken = 'oldRefreshToken';
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('It should return a new token', async () => {
        jwt.sign.mockReturnValue('newJwtToken');
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
    const refreshToken = 'oldRefreshToken';
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('It should logout the user', async () => {
        userService.getUserByRefreshToken.mockResolvedValue(user);
        userService.removeRefreshToken.mockResolvedValue();

        const response = await request(app)
            .post('/logout')
            .send({ refreshToken });
        expect(response.status).toBe(200);
    });

    test('It should return an error if user is not found', async () => {
        userService.getUserByRefreshToken.mockResolvedValue(null);

        const response = await request(app)
            .post('/logout')
            .send({ refreshToken });
        expect(response.status).toBe(400);
    });
});
