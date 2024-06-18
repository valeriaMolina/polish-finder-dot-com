const sinon = require('sinon');
const UserSubmission = require('../../src/models/userSubmissionModel');

describe('UserSubmission Model', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should have correct model name', () => {
        expect(UserSubmission.name).toEqual('user_submissions');
    });

    it('should have correct fields', () => {
        const userSubmission = UserSubmission.build();
        expect(userSubmission).toHaveProperty('submission_id');
        expect(userSubmission).toHaveProperty('status');
    });

    it('should have correct validation', () => {
        const userSubmission = UserSubmission.build({ status: '' });
        userSubmission.validate().then((msg) => {
            expect(msg).toBeDefined();
        });
    });

    it('should have correct default value for status', () => {
        const userSubmission = UserSubmission.build();
        expect(userSubmission.status).toEqual('pending');
    });
});
