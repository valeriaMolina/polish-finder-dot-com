const request = require('supertest');
const express = require('express');
const manageSubmissions = require('../../../../../src/components/submissions/service/manage-submission-service');
const submissionReviewsRouter = require('../../../../../src/components/submissions/api/routes/submission-reviews-router');
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
    '../../../../../src/components/submissions/service/manage-submission-service'
);

const app = express();
app.use('/', submissionReviewsRouter);

describe('Submission reviews route', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.resetAllMocks();
    });
    it('Should handle call to update a submission', async () => {
        manageSubmissions.updatePolishSubmission.mockResolvedValue({
            submission_id: 4,
        });
        const res = await request(app).put('/polish?id=5&status=rejected');
        expect(res.status).toBe(200);
    });
    it('Should handle call to update a brand submission', async () => {
        manageSubmissions.updateBrandSubmission.mockResolvedValue({
            submission_id: 4,
        });
        const res = await request(app).put('/brand?id=5&status=rejected');
        expect(res.status).toBe(200);
    });
    it('Should handle call to update a dupe submission', async () => {
        manageSubmissions.updateDupeSubmission.mockResolvedValue({
            submission_id: 4,
        });
        const res = await request(app).put('/dupe?id=5&status=rejected');
        expect(res.status).toBe(200);
    });
});
