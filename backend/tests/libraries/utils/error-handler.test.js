const {
    BrandNotFoundError,
    BrandAlreadyExistsError,
    PolishAlreadyExistsError,
    UserNotFoundError,
    RoleNotFoundError,
    UserRoleDoesNotExist,
    SequelizeValidationError,
    UserAlreadyHasRoleError,
    DupeSubmissionError,
    NoMatchesFoundError,
    DupeAlreadySubmitterError,
    UserAlreadySubmittedDupeError,
    UserAlreadySubmittedPolishError,
    PolishAlreadySubmittedError,
    UserAlreadySubmittedBrandError,
    BrandAlreadySubmittedError,
    BrandSubmissionError,
    PolishSubmissionError,
    PolishSubmissionNotFoundError,
    PolishSubmissionUpdateStatusError,
    BrandSubmissionNotFoundError,
    BrandSubmissionUpdateStatusError,
    DupeSubmissionNotFoundError,
    DupeSubmissionUpdateStatusError,
    PolishNotFoundError,
    SearchError,
} = require('../../../src/libraries/utils/error-handler');

describe('Custom Error Classes', () => {
    test('BrandNotFoundError should have the correct properties', () => {
        const errorMessage = 'Brand not found';
        const error = new BrandNotFoundError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('BrandNotFoundError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(404);
    });

    test('BrandAlreadyExistsError should have the correct properties', () => {
        const errorMessage = 'Brand already exists';
        const error = new BrandAlreadyExistsError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('BrandAlreadyExistsError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('PolishAlreadyExistsError should have the correct properties', () => {
        const errorMessage = 'Polish already exists';
        const error = new PolishAlreadyExistsError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('PolishAlreadyExistsError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('UserNotFoundError should have the correct properties', () => {
        const errorMessage = 'User not found';
        const error = new UserNotFoundError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('UserNotFoundError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(404);
    });

    test('RoleNotFoundError should have the correct properties', () => {
        const errorMessage = 'Role not found';
        const error = new RoleNotFoundError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('RoleNotFoundError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(404);
    });

    test('UserRoleDoesNotExist should have the correct properties', () => {
        const errorMessage = 'User role does not have this role';
        const error = new UserRoleDoesNotExist(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('UserRoleDoesNotExist');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(404);
    });

    test('SequelizeValidationError should have the correct properties', () => {
        const errorMessage = 'Sequelize validation error';
        const error = new SequelizeValidationError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('SequelizeValidationError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('UserAlreadyHasRoleError should have the correct properties', () => {
        const errorMessage = 'User already has this role';
        const error = new UserAlreadyHasRoleError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('UserAlreadyHasRoleError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('NoMatchesFoundError should have the correct properties', () => {
        const errorMessage = 'No matches found';
        const error = new NoMatchesFoundError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('NoMatchesFoundError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(200);
    });

    test('DupeAlreadySubmitterError should have the correct properties', () => {
        const errorMessage = 'Dupe already submitted by this user';
        const error = new DupeAlreadySubmitterError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('DupeAlreadySubmitterError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('DupeSubmissionError should have the correct properties', () => {
        const errorMessage = 'Dupe submission error';
        const error = new DupeSubmissionError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('DupeSubmissionError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('UserAlreadySubmittedDupeError should have the correct properties', () => {
        const errorMessage = 'User already submitted this dupe';
        const error = new UserAlreadySubmittedDupeError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('UserAlreadySubmittedDupeError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('UserAlreadySubmittedPolishError should have the correct properties', () => {
        const errorMessage = 'User already submitted this polish';
        const error = new UserAlreadySubmittedPolishError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('UserAlreadySubmittedPolishError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('PolishAlreadySubmittedError should have the correct properties', () => {
        const errorMessage = 'Polish already submitted';
        const error = new PolishAlreadySubmittedError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('PolishAlreadySubmittedError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('PolishSubmissionError should have the correct properties', () => {
        const errorMessage = 'Polish submission error';
        const error = new PolishSubmissionError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('PolishSubmissionError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('UserAlreadySubmittedBrandError should have the correct properties', () => {
        const errorMessage = 'User already submitted this brand';
        const error = new UserAlreadySubmittedBrandError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('UserAlreadySubmittedBrandError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('BrandAlreadySubmittedError should have the correct properties', () => {
        const errorMessage = 'Brand already submitted';
        const error = new BrandAlreadySubmittedError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('BrandAlreadySubmittedError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('BrandSubmissionError should have the correct properties', () => {
        const errorMessage = 'Brand submission error';
        const error = new BrandSubmissionError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('BrandSubmissionError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('PolishSubmissionNotFoundError should have the correct properties', () => {
        const errorMessage = 'Polish submission not found';
        const error = new PolishSubmissionNotFoundError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('PolishSubmissionNotFoundError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(404);
    });

    test('PolishSubmissionUpdateStatusError should have the correct properties', () => {
        const errorMessage = 'Polish submission update status error';
        const error = new PolishSubmissionUpdateStatusError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('PolishSubmissionUpdateStatusError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('BrandSubmissionNotFoundError should have the correct properties', () => {
        const errorMessage = 'Brand submission not found';
        const error = new BrandSubmissionNotFoundError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('BrandSubmissionNotFoundError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(404);
    });

    test('BrandSubmissionUpdateStatusError should have the correct properties', () => {
        const errorMessage = 'Brand submission update status error';
        const error = new BrandSubmissionUpdateStatusError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('BrandSubmissionUpdateStatusError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('DupeSubmissionNotFoundError should have the correct properties', () => {
        const errorMessage = 'Dupe submission not found';
        const error = new DupeSubmissionNotFoundError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('DupeSubmissionNotFoundError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(404);
    });

    test('DupeSubmissionUpdateStatusError should have the correct properties', () => {
        const errorMessage = 'Dupe submission update status error';
        const error = new DupeSubmissionUpdateStatusError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('DupeSubmissionUpdateStatusError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    test('PolishNotFoundError should have the correct properties', () => {
        const errorMessage = 'Polish not found';
        const error = new PolishNotFoundError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('PolishNotFoundError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(404);
    });

    test('SearchError should have the correct properties', () => {
        const errorMessage = 'Search error';
        const error = new SearchError(errorMessage);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('SearchError');
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });
});
