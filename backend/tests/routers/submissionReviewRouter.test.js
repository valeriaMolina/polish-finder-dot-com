const request = require('supertest');
const express = require('express');
const router = require('../../src/routers/submissionReviewsRouter');
const userSubmissionService = require('../../src/services/userSubmissionService');
const polishService = require('../../src/services/polishService');
const logger = require('../../src/config/logger');
const userSubmission = require('../../src/models/userSubmissionModel');

// Mock the services and logger
jest.mock('../../src/services/userSubmissionService');
jest.mock('../../src/services/polishService');
jest.mock('../../src/config/logger');

const app = express();
app.use(express.json());
app.use('/', router);

describe('PUT /api/approveSubmission', () => {
    it('should return 400 if submission not found', async () => {
        userSubmissionService.findUserSubmissionById.mockResolvedValue(null);

        const response = await request(app).put(
            '/api/approveSubmission?submissionId=1'
        );
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Submission not found' });
    });

    it('should return 200 if submission is approved', async () => {
        userSubmissionService.findUserSubmissionById.mockResolvedValue({
            polish_id: 1,
            similar_to_polish_id: 2,
        });
        polishService.addDupePolishId.mockResolvedValue(true);

        const response = await request(app).put(
            '/api/approveSubmission?submissionId=1'
        );
        expect(response.statusCode).toBe(200);
    });
});

describe('PUT /api/rejectSubmission', () => {
    it('should return 400 if submission not found', async () => {
        userSubmissionService.findUserSubmissionById.mockResolvedValue(null);

        const response = await request(app).put(
            '/api/rejectSubmission?submissionId=1'
        );
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Submission not found' });
    });

    it('should return 200 if submission is rejected', async () => {
        userSubmissionService.findUserSubmissionById.mockResolvedValue({
            id: 1,
            status: 'pending',
        });

        userSubmissionService.rejectUserSubmission.mockResolvedValue({
            id: 1,
            status: 'rejected',
        });

        const response = await request(app).put(
            '/api/rejectSubmission?submissionId=1'
        );
        expect(response.statusCode).toBe(200);
    });
});
