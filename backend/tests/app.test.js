const request = require('supertest');
const express = require('express');
const emailService = require('../src/components/users/service/email-service');
const app = require('../index');

describe('GET /', () => {
    afterAll(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
        emailService.close();
    });
    it('responds with "API is running..."', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('API is running...');
    });
});
