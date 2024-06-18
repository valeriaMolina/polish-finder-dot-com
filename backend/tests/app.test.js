const request = require('supertest');
const express = require('express');
const app = require('../index'); // adjust this path to match where your index.js file is located

describe('GET /', () => {
    it('responds with "API is running..."', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('API is running...');
    });
});
