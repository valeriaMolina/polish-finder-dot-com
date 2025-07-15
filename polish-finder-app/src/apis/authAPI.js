/**
 * @author Valeria Molina Recinos
 */
import config from '@/config';
import axiosInstance from '@/utils/axios';
import base64 from 'base-64';

const SERVER = config.SERVER;

/**
 * Sends a login request to the server with the provided username and password.
 *
 * @param {string} username - The username of the user attempting to log in.
 * @param {string} password - The password of the user attempting to log in.
 *
 * @returns {Promise<Object>} - A promise that resolves with the user's data upon successful login.
 * If the login is successful, the promise will resolve with the user's data.
 * If the login fails, the promise will reject with an error containing the HTTP status code.
 *
 * @throws {Error} - Throws an error if the login request fails.
 * The error will contain the HTTP status code.
 */
export async function sendLogin(username, password) {
    try {
        const instance = axiosInstance.create({
            baseURL: SERVER,
            headers: { Authorization: `Basic ${base64.encode(`${username}:${password}`)}` },
            method: 'post',
            data: {
                username,
            },
        });
        const res = await instance.post('/login');
        return res.data;
    } catch (err) {
        if (err.response.data.errorName === 'UserNotVerifiedError') {
            throw new Error('UserNotVerifiedError');
        }
        throw new Error(err.response.status);
    }
}

/**
 * Sends a logout request to the server.
 *
 * @returns {Promise<Object>} - A promise that resolves with the server's response upon successful logout.
 * If the logout is successful, the promise will resolve with the server's response.
 * If the logout fails, the promise will reject with an error containing the HTTP status code.
 *
 * @throws {Error} - Throws an error if the logout request fails.
 * The error will contain the HTTP status code.
 */
export async function sendLogout() {
    try {
        const instance = axiosInstance.create({
            baseURL: SERVER,
            method: 'post',
            withCredentials: true,
        });
        const res = await instance.post('/logout');
        return res;
    } catch (error) {
        throw new Error(error.response.status);
    }
}

/**
 * Sends a registration request to the server with the provided user information.
 *
 * @param {string} username - The username of the user attempting to register.
 * @param {string} password - The password of the user attempting to register.
 * @param {string} email - The email of the user attempting to register.
 *
 * @returns {Promise<void>} - A promise that resolves upon successful registration.
 * If the registration is successful, the promise will resolve without any value.
 * If the registration fails, the promise will reject with an error containing the HTTP status code.
 *
 * @throws {Error} - Throws an error if the registration request fails.
 * The error will contain the HTTP status code.
 */
export async function sendRegister(username, password, email) {
    try {
        const instance = axiosInstance.create({
            baseURL: SERVER,
            method: 'post',
            data: {
                username,
                password,
                email,
            },
        });
        const res = await instance.post('/signup');
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Verifies a user's account using a verification token.
 *
 * @param {string} token - The verification token sent to the user's email.
 *
 * @returns {Promise<Object>} - A promise that resolves with the server's response upon successful verification.
 * If the verification is successful, the promise will resolve with the server's response.
 * If the verification fails, the promise will reject with an error containing the HTTP status code.
 *
 * @throws {Error} - Throws an error if the verification request fails.
 * The error will contain the HTTP status code.
 */
export async function verifyUser(token) {
    try {
        const verifyRequest = axiosInstance.create({
            baseURL: SERVER,
            method: 'post',
            data: {
                mes: 'null',
            },
        });
        const res = await verifyRequest.post(`/verify?token=${token}`);
        return res;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Sends a resend verification request to the server for the provided email address.
 *
 * @param {string} email - The email address of the user for whom the verification email needs to be resent.
 *
 * @returns {Promise<Object>} - A promise that resolves with the server's response upon successful resend.
 * If the resend is successful, the promise will resolve with the server's response.
 * If the resend fails, the promise will reject with an error containing the HTTP status code.
 *
 * @throws {Error} - Throws an error if the resend verification request fails.
 * The error will contain the HTTP status code.
 */
export async function resendVerification(email) {
    const resendRequest = axiosInstance.create({
        baseURL: SERVER,
        method: 'post',
    });
    await resendRequest.post('/verify/resend', { email });
}

/**
 * Sends a password reset email to the server for the provided identifier (username or email).
 *
 * @param {string} identifier - The username or email of the user for whom the password reset email needs to be sent.
 *
 * @returns {Promise<void>} - A promise that resolves upon successful sending of the password reset email.
 * If the email is sent successfully, the promise will resolve without any value.
 * If the email sending fails, the promise will reject with an error containing the HTTP status code.
 *
 * @throws {Error} - Throws an error if the password reset email sending request fails.
 * The error will contain the HTTP status code.
 */
export async function forgotPassword(identifier) {
    const forgotPasswordRequest = axiosInstance.create({
        baseURL: SERVER,
        method: 'post',
    });
    await forgotPasswordRequest.post('/send-password-reset-email', { identifier });
}

/**
 * Verifies the password reset email
 * @param {*} token
 */
export async function verifyPasswordResetToken(token) {
    const verifyTokenRequest = axiosInstance.create({
        baseURL: SERVER,
        method: 'get',
    });
    await verifyTokenRequest.get(`/verify-reset-password-token?token=${token}`);
}
