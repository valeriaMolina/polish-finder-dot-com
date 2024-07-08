const sinon = require('sinon');
const polishSubmissionService = require('../../../../src/components/submissions/service/polish-submission-service');
const brandSubmissionService = require('../../../../src/components/submissions/service/brand-submission-service');
const dupeSubmissionService = require('../../../../src/components/submissions/service/dupe-submission-service');
const manageSubmissionService = require('../../../../src/components/submissions/service/manage-submission-service');

jest.mock(
    '../../../../src/components/submissions/service/polish-submission-service'
);
jest.mock(
    '../../../../src/components/submissions/service/brand-submission-service'
);
jest.mock(
    '../../../../src/components/submissions/service/dupe-submission-service'
);

describe('Manage Submission Service tests', () => {
    const mockDupeSubmission = {
        submission_id: 1,
        user_id: 3,
        polish_id: 6,
        similar_to_polish_id: 3,
        created_at: new Date(),
        status: 'pending',
        save: () => Promise.resolve(),
    };
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
    const mockBrandSubmission = {
        submission_id: 1,
        user_id: 1,
        name: 'test',
        status: 'pending',
        save: () => Promise.resolve(),
    };
    it('Should update a dupe submission status', async () => {
        const approvedMock = mockDupeSubmission;
        approvedMock.status = 'approved';
        dupeSubmissionService.findUserSubmissionById.mockResolvedValue(
            mockDupeSubmission
        );
        dupeSubmissionService.updateDupeSubmissionStatus.mockResolvedValue(
            approvedMock
        );
        const update = await manageSubmissionService.updateDupeSubmission(
            1,
            'approved'
        );
        expect(update.status).toEqual('approved');
    });
    it('Should update a polish submission status', async () => {
        const approvedMock = mockPolishSubmission;
        approvedMock.status = 'approved';
        polishSubmissionService.findSubmissionById.mockResolvedValue(
            mockPolishSubmission
        );
        polishSubmissionService.updatePolishSubmissionStatus.mockResolvedValue(
            approvedMock
        );
        const update = await manageSubmissionService.updatePolishSubmission(
            1,
            'approved'
        );
        expect(update.status).toEqual('approved');
    });
    it('Should update a brand submission status', async () => {
        const approvedMock = mockBrandSubmission;
        approvedMock.status = 'approved';
        brandSubmissionService.findSubmissionById.mockResolvedValue(
            mockBrandSubmission
        );
        brandSubmissionService.updateBrandSubmissionStatus.mockResolvedValue(
            approvedMock
        );
        const update = await manageSubmissionService.updateBrandSubmission(
            1,
            'approved'
        );
        expect(update.status).toEqual('approved');
    });
});
