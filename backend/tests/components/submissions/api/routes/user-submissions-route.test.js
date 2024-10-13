const request = require('supertest');
const express = require('express');
const userSubmissionRoute = require('../../../../../src/components/submissions/api/routes/user-submissions-router');
const submissionService = require('../../../../../src/components/submissions/service/submission-service');
const submissionValidator = require('../../../../../src/components/submissions/api/middleware/submissions-validator');
jest.mock(
    '../../../../../src/components/rbac/api/middleware/rbac-middeware',
    () => {
        const originalModule = jest.requireActual(
            '../../../../../src/components/rbac/api/middleware/rbac-middeware'
        );

        // Mock only 'authenticateToken' and 'authorize' functions
        return {
            ...originalModule, // spread the original module to retain non-mocked functions
            authenticateToken: jest.fn((req, res, next) => next()),
            authorize: jest.fn((permission) => (req, res, next) => next()),
        };
    }
);

jest.mock(
    '../../../../../src/components/submissions/api/middleware/submissions-validator',
    () => {
        const originalModule = jest.requireActual(
            '../../../../../src/components/submissions/api/middleware/submissions-validator'
        );
        // mock functions
        return {
            ...originalModule, // spread the original module to retain non-mocked functions
            validatePolishSubmission: jest.fn((req, res, next) => next()),
            formatPolishSubmission: jest.fn((req, res, next) => next()),
            validateBrandSubmission: jest.fn((req, res, next) => next()),
        };
    }
);

jest.mock(
    '../../../../../src/components/submissions/service/submission-service'
);

const app = express();
app.use('/', userSubmissionRoute);

describe('User submissions route', () => {
    afterAll(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });
    it('Should handle call to submit a dupe', async () => {
        submissionService.submitDupe.mockResolvedValue({ submission_id: 5 });
        const res = await request(app).post('/dupe?polishId=4&dupeId=8').send({
            username: 'testUser',
        });
        expect(res.status).toBe(201);
    });
    it('Should handle call to submit a new polish', async () => {
        submissionService.submitPolish.mockResolvedValue({ submission_id: 6 });
        const res = await request(app)
            .post('/polish')
            .send({
                brandName: 'Cuticula',
                type: 'Lacquer',
                primaryColor: 'Black',
                effectColors: ['Black', 'Blue', 'Yellow'],
                formulas: ['Flake'],
                name: 'Unicorn Realm',
                description:
                    'a black jelly base with orange/gold, purple/red, blue/purple, green/blue, blue/purple/green glass like flakes',
            });
        expect(res.body).toEqual({ submission_id: 6 });
    });
    it('Should handle call to submit a new brand', async () => {
        submissionService.submitBrand.mockResolvedValue({ submission_id: 7 });
        const res = await request(app).post('/brand').send({
            brandName: 'Cuticula',
        });
        expect(res.status).toBe(201);
    });
});
