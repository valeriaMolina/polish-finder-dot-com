const dupeSubmissionService = require('../../../../src/components/submissions/service/dupe-submission-service');
const brandSubmissionService = require('../../../../src/components/submissions/service/brand-submission-service');
const polishService = require('../../../../src/components/polish/service/polish-service');
const brandService = require('../../../../src/components/brands/service/brand-service');
const polishSubmissionService = require('../../../../src/components/submissions/service/polish-submission-service');
const manageSubmissionService = require('../../../../src/components/submissions/service/manage-submission-service');
const submissionService = require('../../../../src/components/submissions/service/submission-service');

jest.mock(
    '../../../../src/components/submissions/service/dupe-submission-service'
);
jest.mock(
    '../../../../src/components/submissions/service/brand-submission-service'
);
jest.mock('../../../../src/components/polish/service/polish-service');
jest.mock('../../../../src/components/brands/service/brand-service');
jest.mock(
    '../../../../src/components/submissions/service/polish-submission-service'
);
jest.mock(
    '../../../../src/components/submissions/service/manage-submission-service'
);

describe('submit polish', () => {
    const data = {
        name: 'Test polish',
        brandName: 'Test brand',
        user: { user: { id: 1 } },
        submission: {},
    };
    it('Should submit a polish successfully', async () => {
        polishService.polishExists.mockResolvedValue(null);
        polishSubmissionService.submissionExists.mockResolvedValue(null);
        brandService.findBrandNameInTable.mockResolvedValue({ brand_id: 1 });
        polishSubmissionService.insertNewPolishSubmission.mockResolvedValue({
            submission_id: 1,
            user_id: 1,
            polish_name: 'Test polish',
            status: 'pending',
        });

        const result = await submissionService.submitPolish(data);

        expect(result).toEqual({
            submission_id: 1,
            user_id: 1,
            polish_name: 'Test polish',
            status: 'pending',
        });
    });
});

describe('submit brand', () => {
    const data = {
        name: 'Test brand',
        user: { user: { id: 1 } },
    };
    it('Should submit a brand successfully', async () => {
        brandService.findBrandNameInTable.mockResolvedValue(null);
        brandSubmissionService.brandSubmissionExists.mockResolvedValue(null);
        brandSubmissionService.insertBrandSubmission.mockResolvedValue({
            submission_id: 1,
            user_id: 1,
            brand_name: 'Test brand',
            status: 'pending',
        });

        const result = await submissionService.submitBrand(data);

        expect(result).toEqual({
            submission_id: 1,
            user_id: 1,
            brand_name: 'Test brand',
            status: 'pending',
        });
    });
    it('Should throw BrandAlreadyExistsError if the brand already exists', async () => {
        brandService.findBrandNameInTable.mockResolvedValue({ brand_id: 1 });

        await expect(submissionService.submitBrand(data)).rejects.toThrow();
    });
    it('Should throw BrandAlreadySubmittedError if someone else has already submitted this brand', async () => {
        brandService.findBrandNameInTable.mockResolvedValue(null);
        brandSubmissionService.brandSubmissionExists.mockResolvedValue({
            submission_id: 1,
            user_id: 2,
            brand_name: 'Test brand',
            status: 'pending',
        });

        await expect(submissionService.submitBrand(data)).rejects.toThrow();
    });
    it('Should throw UserAlreadySubmittedBrandError when the user has already submitted the brand', async () => {
        brandService.findBrandNameInTable.mockResolvedValue(null);
        brandSubmissionService.brandSubmissionExists.mockResolvedValue({
            submission_id: 1,
            user_id: 1,
            brand_name: 'Test brand',
            status: 'pending',
        });

        await expect(submissionService.submitBrand(data)).rejects.toThrow();
    });
});

describe('submit dupe', () => {
    const data = {
        polishId: 1,
        dupeId: 2,
        user: { user: { id: 3 } },
    };
    it('Should submit a dupe and fail due to duplicate', async () => {
        dupeSubmissionService.checkIfSubmissionExists.mockResolvedValue({
            submission_id: 7,
            user_id: 6,
        });
        expect(submissionService.submitDupe(data)).rejects.toThrow();
    });
    it('should submit a duoe', async () => {
        dupeSubmissionService.checkIfSubmissionExists.mockResolvedValue(null);
        dupeSubmissionService.insertNewDupeSubmission.mockResolvedValue({
            submission_id: 8,
            user_id: 3,
            polish_id: 1,
            dupe_id: 2,
            status: 'pending',
        });
        expect(submissionService.submitDupe(data)).resolves.toEqual({
            submission_id: 8,
            user_id: 3,
            polish_id: 1,
            dupe_id: 2,
            status: 'pending',
        });
    });
});
