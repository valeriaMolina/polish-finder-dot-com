const jwt = require('jsonwebtoken');
const express = require('express');
const request = require('supertest');
const bcrypt = require('bcrypt');
const router = require('../../src/routers/authRouter');
const userService = require('../../src/services/userService');
const logger = require('../../src/config/logger');
const config = require('../../src/config/config');

// Mock the services
jest.mock('../../src/services/userService');
jest.mock('../../src/config/logger');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../src/config/logger');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Auth Router', () => {
    let refreshToken;
    const user = {
        user_id: '123',
        username: 'john_doe',
        email: 'johndoe@example.com',
    };

    beforeEach(() => {
        // generate a valid refresh token for the user
        refreshToken = jwt.sign(
            { user: { id: user.user_id } },
            config.refreshTokenSecret,
            { expiresIn: '24h' }
        );
    });

    afterEach(() => {
        // clear any mocks or setup done in beforeEach
        jest.clearAllMocks();
    });

    test('POST /auth', async () => {
        userService.getUserId.mockResolvedValue(true);
        const res = await request(app)
            .post('/auth')
            .send({ identifier: 'john_doe', password: '123' });
        expect(res.status).toBe(200);
    });
});
