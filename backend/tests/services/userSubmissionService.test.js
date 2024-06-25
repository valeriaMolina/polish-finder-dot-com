const sinon = require('sinon');
const userSubmissionModel = require('../../src/models/userSubmissionModel');
const userSubmissionService = require('../../src/services/userSubmissionService');

describe('userSubmissionService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should insert a new user submission', async () => {
        const mockSubmission = { submission_id: '123', status: 'pending' };
        sinon
            .stub(userSubmissionModel, 'create')
            .returns(Promise.resolve(mockSubmission));

        const newUserSubmission =
            await userSubmissionService.insertNewUserSubmission(mockSubmission);
        expect(newUserSubmission).toEqual(mockSubmission);
    });

    it('should approve a user submission', async () => {
        const mockSubmission = {
            submission_id: '123',
            status: 'pending',
            save: sinon.stub().resolves(),
        };
        sinon
            .stub(userSubmissionModel, 'findOne')
            .returns(Promise.resolve(mockSubmission));

        const approvedSubmission =
            await userSubmissionService.approveUserSubmission('123');
        expect(approvedSubmission.status).toEqual('approved');
    });

    it('should reject a user submission', async () => {
        const mockSubmission = {
            submission_id: '123',
            status: 'pending',
            save: sinon.stub().resolves(),
        };
        sinon
            .stub(userSubmissionModel, 'findOne')
            .returns(Promise.resolve(mockSubmission));

        const rejectedSubmission =
            await userSubmissionService.rejectUserSubmission('123');
        expect(rejectedSubmission.status).toEqual('rejected');
    });

    it('should find a user submission by id', async () => {
        const mockSubmission = {
            submission_id: '123',
            status: 'pending',
            save: sinon.stub().resolves(),
        };
        sinon
            .stub(userSubmissionModel, 'findOne')
            .returns(Promise.resolve(mockSubmission));

        const findSubmission =
            await userSubmissionService.findUserSubmissionById('123');
        expect(findSubmission).toEqual(mockSubmission);
    });
});
