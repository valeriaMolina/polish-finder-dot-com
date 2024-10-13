const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const cookieParser = require('cookie-parser');

const authRouter = require('../../../../../src/components/users/api/routes/auth-router');
const authService = require('../../../../../src/components/users/service/auth-service');
const userService = require('../../../../../src/components/users/service/user-service');
const emailService = require('../../../../../src/components/users/service/email-service');
const {
    InvalidCredentialsError,
    UserNotFoundError,
    UserNameAlreadyInUseError,
    EmailAlreadyInUseError,
    UserNotVerifiedError,
} = require('../../../../../src/libraries/utils/error-handler');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../../../../src/components/users/service/auth-service');
jest.mock('../../../../../src/components/users/service/user-service');
jest.mock('../../../../../src/components/rbac/service/roles-service');
jest.mock('../../../../../src/components/rbac/service/user-roles-service');
jest.mock('../../../../../src/components/users/service/email-service');

const app = express();
app.use(express.json());
app.use(cookieParser());
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
    const validBasicAuth = `Basic ${base64.encode(`${validIdentifier}:${validPassword}`)}`;
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('It should authenticate user with valid credentials', async () => {
        authService.logInUser.mockResolvedValue({
            accessToken: validJwtToken,
            refreshToken: validRefreshToken,
            userName: validIdentifier,
            userEmail: 'mail@mail.com',
        });
        const response = await request(app)
            .post('/login')
            .send({ username: validIdentifier })
            .set('authorization', validBasicAuth);

        expect(response.status).toBe(200);
    });
    test('It should return 400 status when username is not verified', async () => {
        authService.logInUser.mockRejectedValue(
            new UserNotVerifiedError('User not verified')
        );
        const response = await request(app)
            .post('/login')
            .send({})
            .set('authorization', validBasicAuth);

        expect(response.status).toBe(400);
    });
    test('It should return 400 status when user is not found', async () => {
        authService.logInUser.mockRejectedValue(
            new UserNotFoundError('User not found')
        );

        const response = await request(app)
            .post('/login')
            .send({})
            .set('authorization', validBasicAuth);

        expect(response.status).toBe(404);
    });
    test('It shoould return 400 status when password does not match', async () => {
        authService.logInUser.mockRejectedValue(
            new InvalidCredentialsError('Invalid Credentials')
        );
        const response = await request(app)
            .post('/login')
            .send()
            .set('authorization', validBasicAuth);

        expect(response.status).toBe(401);
    });
});

describe('POST /signup', () => {
    const newUsername = 'newUser';
    const newEmail = 'email@mail.com';
    const password = 'password';
    const newUser = {
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
        userName: newUsername,
        userEmail: newEmail,
        verificationToken: 'newVerificationToken',
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
    afterAll(() => {
        jest.restoreAllMocks();
    });
    test('It should create a new user', async () => {
        authService.registerUser.mockResolvedValue(newUser);
        emailService.sendAccountVerificationEmail.mockImplementation(() => {});
        const response = await request(app)
            .post('/signup')
            .send({ username: newUsername, email: newEmail, password: 123 });

        expect(response.status).toBe(201);
    });

    test('It should return 400 status when user already exists', async () => {
        authService.registerUser.mockRejectedValue(
            new UserNameAlreadyInUseError('User name already in use')
        );
        const response = await request(app)
            .post('/signup')
            .send({ username: newUsername, email: newEmail, password: 123 });
        expect(response.status).toBe(409);
    });

    test('It should return 400 status when email already exists', async () => {
        authService.registerUser.mockRejectedValue(
            new EmailAlreadyInUseError('Email already in use')
        );
        const response = await request(app)
            .post('/signup')
            .send({ username: newUsername, email: newEmail, password: 123 });
        expect(response.status).toBe(409);
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
    afterAll(() => {
        jest.restoreAllMocks();
    });
    test('It should return a new token', async () => {
        jwt.sign.mockReturnValue('newJwtToken');
        userService.getUserByRefreshToken.mockResolvedValue(user);

        const response = await request(app)
            .post('/refresh')
            .set('Cookie', `refreshToken=${refreshToken}`)
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
        authService.logOutUser.mockRejectedValue(
            new UserNotFoundError('User not found')
        );

        const response = await request(app)
            .post('/logout')
            .send({ refreshToken });
        expect(response.status).toBe(404);
    });
});

describe('POST /verify', () => {
    const verificationToken = 'newVerificationToken';
    const user = {
        user_id: 4,
        username: 'user',
        email: 'newEmail',
        password_hash: 'password',
    };
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('It should verify the user account', async () => {
        authService.verifyUser.mockResolvedValue();
        const response = await request(app).post(
            '/verify?token=' + verificationToken
        );
        expect(response.status).toBe(200);
    });
});

describe('POST /verify/resend', () => {
    test('it should resend the verification email', async () => {
        const email = 'email@mail.com';
        authService.resendVerificationEmail.mockResolvedValue();
        const response = await request(app)
            .post('/verify/resend')
            .send({ email });
        expect(response.status).toBe(200);
    });
    test('it should return 201 if the email is not found', async () => {
        const email = 'email@mail.com';
        authService.resendVerificationEmail.mockRejectedValue(
            new UserNotFoundError('User not found')
        );
        const response = await request(app)
            .post('/verify/resend')
            .send({ email });
        expect(response.status).toBe(200);
    });
    test('it should return 500 if something went wrong', async () => {
        const email = 'email@mail.com';
        authService.resendVerificationEmail.mockRejectedValue(
            new Error('Error')
        );
        const response = await request(app)
            .post('/verify/resend')
            .send({ email });
        expect(response.status).toBe(500);
    });
});

describe('POST /reset-password/:token', () => {
    test('It should reset the password', async () => {
        const token = 'token';
        const newPassword = 'newPassword';
        authService.resetUserPassword.mockResolvedValue('3');
        emailService.sendPasswordChangedEmail.mockImplementation(() => {});
        const response = await request(app)
            .post(`/reset-password/${token}`)
            .send({ newPassword });
        expect(response.status).toBe(201);
    });
    test('it should return 400 if the token is invalid', async () => {
        authService.resetUserPassword.mockRejectedValue(
            new InvalidCredentialsError('Invalid credentials')
        );

        const response = await request(app)
            .post('/reset-password/invalidToken')
            .send({ newPassword: 'newPassword' });
        expect(response.status).toBe(401);
    });
    test('it should return 500 if something went wrong', async () => {
        authService.resetUserPassword.mockRejectedValue(new Error('Error'));

        const response = await request(app)
            .post('/reset-password/invalidToken')
            .send({ newPassword: 'newPassword' });
        expect(response.status).toBe(500);
    });
    test('it should return 400 if the new password is missing', async () => {
        const response = await request(app)
            .post('/reset-password/invalidToken')
            .send({});
        expect(response.status).toBe(400);
    });
});

describe('GET /verify-reset-password-token', () => {
    test('it should verify the reset password token', async () => {
        authService.verifyResetPasswordToken.mockResolvedValue(true);
        const response = await request(app).get(
            '/verify-reset-password-token?token=token'
        );
        expect(response.status).toBe(200);
    });
    test('it should return 400 if the token is invalid', async () => {
        authService.verifyResetPasswordToken.mockRejectedValue(
            new InvalidCredentialsError('Invalid credentials')
        );
        const response = await request(app).get(
            '/verify-reset-password-token?token=invalidToken'
        );
        expect(response.status).toBe(401);
    });
    test('it should return 500 if something went wrong', async () => {
        authService.verifyResetPasswordToken.mockRejectedValue(
            new Error('Error')
        );
        const response = await request(app).get(
            '/verify-reset-password-token?token=invalidToken'
        );
        expect(response.status).toBe(500);
    });
    test('it should return 400 if the token is missing', async () => {
        const response = await request(app).get('/verify-reset-password-token');
        expect(response.status).toBe(400);
    });
});

describe('POST /send-password-reset-email', () => {
    test('it should send a password reset email', async () => {
        const identifier = 'identifier';
        authService.passwordReset.mockResolvedValue({
            resetPasswordToken: 'newToken',
            username: 'username',
            email: 'email',
        });
        emailService.sendPasswordResetEmail.mockImplementation(() => {});
        const response = await request(app)
            .post('/send-password-reset-email')
            .send({ identifier });
        expect(response.status).toBe(201);
    });
    test('it should return 400 if the identifier is not found', async () => {
        const identifier = 'identifier';
        authService.passwordReset.mockRejectedValue(
            new UserNotFoundError('User not found')
        );
        const response = await request(app)
            .post('/send-password-reset-email')
            .send({ identifier });
        expect(response.status).toBe(201);
    });
    test('it should return 500 if something went wrong', async () => {
        const identifier = 'identifier';
        authService.passwordReset.mockRejectedValue(new Error('Error'));
        const response = await request(app)
            .post('/send-password-reset-email')
            .send({ identifier });
        expect(response.status).toBe(500);
    });
});
