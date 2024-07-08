const sinon = require('sinon');
const polishSubmissionModel = require('../../../../src/components/submissions/db/polish-submissions');
const polishSubmissionService = require('../../../../src/components/submissions/service/polish-submission-service');

describe('Polish Submission Service tests', () => {
    const mockPolishSubmission = {
        submission_id: 1,
        user_id: 3,
        brand_id: 6,
        type_id: 2,
        primary_color_id: 4,
        effect_color_ids: [1, 2, 3],
        formula_ids: [1, 2, 3],
        name: 'test',
        description: 'test',
        status: 'pending',
        save: () => Promise.resolve(),
    };
    afterEach(() => {
        sinon.restore();
    });
    it('Should insert a new polish submission', async () => {
        sinon
            .stub(polishSubmissionModel, 'create')
            .returns(Promise.resolve(mockPolishSubmission));
        const submission =
            await polishSubmissionService.insertNewPolishSubmission({
                user_id: 3,
                brand_id: 4,
                name: 'test',
            });
        expect(submission).toEqual(mockPolishSubmission);
    });
    it('Should find a polish submission by id', async () => {
        sinon
            .stub(polishSubmissionModel, 'findOne')
            .returns(Promise.resolve(mockPolishSubmission));
        const submission = await polishSubmissionService.findSubmissionById(1);
        expect(submission).toEqual(mockPolishSubmission);
    });
    it('Should update a polish submission status', async () => {
        sinon
            .stub(polishSubmissionModel, 'findOne')
            .returns(Promise.resolve(mockPolishSubmission));
        const submission =
            await polishSubmissionService.updatePolishSubmissionStatus(
                mockPolishSubmission,
                'approved'
            );
        expect(submission.status).toEqual('approved');
    });
    it('should find out if a submission does not exist', async () => {
        sinon.stub(polishSubmissionModel, 'findOne').returns(null);
        const notMatch = await polishSubmissionService.submissionExists(
            5,
            'null'
        );
        expect(notMatch).toBeNull();
    });
});
