const sinon = require('sinon');
const dupeSubmissionModel = require('../../../../src/components/submissions/db/dupe-submissions');
const dupeSubmissionService = require('../../../../src/components/submissions/service/dupe-submission-service');

describe('Dupe Submission Service', () => {
    const mockDupeSubmission = {
        submission_id: 1,
        user_id: 3,
        polish_id: 6,
        similar_to_polish_id: 3,
        created_at: new Date(),
        status: 'pending',
        save: () => Promise.resolve(),
    };

    afterEach(() => {
        sinon.restore();
    });

    it('Should insert a new dupe submission', async () => {
        sinon
            .stub(dupeSubmissionModel, 'create')
            .returns(Promise.resolve(mockDupeSubmission));
        const newSubmission =
            await dupeSubmissionService.insertNewDupeSubmission(
                mockDupeSubmission
            );
        expect(newSubmission).toEqual(mockDupeSubmission);
    });
    it('Should check if a submission already exists', async () => {
        sinon
            .stub(dupeSubmissionModel, 'findOne')
            .returns(Promise.resolve(mockDupeSubmission));
        const find = await dupeSubmissionService.checkIfSubmissionExists(1, 3);
        expect(find).toEqual(mockDupeSubmission);
    });
    it('Should return null when checking if a submission exists', async () => {
        sinon.stub(dupeSubmissionModel, 'findOne').returns(null);
        const find = await dupeSubmissionService.checkIfSubmissionExists(1, 3);
        expect(find).toBeNull();
    });
    it('Should find a dupe submission by id', async () => {
        sinon
            .stub(dupeSubmissionModel, 'findOne')
            .returns(Promise.resolve(mockDupeSubmission));
        const findById = await dupeSubmissionService.findUserSubmissionById(1);
        expect(findById).toEqual(mockDupeSubmission);
    });
    it('Should update a dupe submission status', async () => {
        sinon
            .stub(dupeSubmissionModel, 'findOne')
            .returns(Promise.resolve(mockDupeSubmission));
        const update = await dupeSubmissionService.updateDupeSubmissionStatus(
            mockDupeSubmission,
            'approved'
        );
        expect(update.status).toEqual('approved');
    });
});
