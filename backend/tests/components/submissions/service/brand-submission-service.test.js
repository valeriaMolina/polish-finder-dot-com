const sinon = require('sinon');
const brandSubmissionModel = require('../../../../src/components/submissions/db/brand-submissions');
const brandSubmissionService = require('../../../../src/components/submissions/service/brand-submission-service');

describe('Brand Submission Service', () => {
    const mockBrandSubmission = {
        submission_id: 1,
        user_id: 1,
        name: 'test',
        status: 'pending',
        save: () => Promise.resolve(),
    };
    const mockSub = {
        user_id: 1,
        name: 'test',
    };

    afterEach(() => {
        sinon.restore();
    });

    it('Should create a new brand submission', async () => {
        sinon
            .stub(brandSubmissionModel, 'create')
            .returns(Promise.resolve(mockBrandSubmission));
        const newBrandSubmission =
            await brandSubmissionService.insertBrandSubmission(mockSub);
        expect(newBrandSubmission).toEqual(mockBrandSubmission);
    });

    it('Should check if a brand submission exists', async () => {
        sinon
            .stub(brandSubmissionModel, 'findOne')
            .returns(Promise.resolve(mockBrandSubmission));
        const findSubmission =
            await brandSubmissionService.brandSubmissionExists(mockSub);
        expect(findSubmission).toEqual(mockBrandSubmission);
    });

    it('Should find a brand submission by id', async () => {
        sinon
            .stub(brandSubmissionModel, 'findOne')
            .returns(Promise.resolve(mockBrandSubmission));
        const findSubmissionById =
            await brandSubmissionService.findSubmissionById(
                mockBrandSubmission.submission_id
            );
        expect(findSubmissionById).toEqual(mockBrandSubmission);
    });
    it('Should update a brand submission status', async () => {
        sinon
            .stub(brandSubmissionModel, 'findOne')
            .returns(Promise.resolve(mockBrandSubmission));
        const updateSubmission =
            await brandSubmissionService.updateBrandSubmissionStatus(
                mockBrandSubmission,
                'approved'
            );
        expect(updateSubmission.status).toEqual('approved');
    });
});
