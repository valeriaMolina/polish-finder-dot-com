/**
 * Custom error handling for different scenarios
 * @author Valeria Molina Recinos
 */
class BrandNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BrandNotFoundError';
        this.statusCode = 404; // not f
    }
}

class BrandAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BrandAlreadyExistsError';
        this.statusCode = 400; // conflict
    }
}

class PolishAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PolishAlreadyExistsError';
        this.statusCode = 400; // conflict
    }
}

class UserNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNotFoundError';
        this.statusCode = 404; // not found
    }
}

class RoleNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RoleNotFoundError';
        this.statusCode = 404; // not found
    }
}

class UserRoleDoesNotExist extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserRoleDoesNotExist';
        this.statusCode = 404; // not found
    }
}

class SequelizeValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SequelizeValidationError';
        this.statusCode = 400; // bad request
    }
}

class UserAlreadyHasRoleError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserAlreadyHasRoleError';
        this.statusCode = 400; // bad request
    }
}

class NoMatchesFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NoMatchesFoundError';
        this.statusCode = 200; // not found
    }
}

module.exports = {
    BrandNotFoundError,
    PolishAlreadyExistsError,
    BrandAlreadyExistsError,
    UserNotFoundError,
    RoleNotFoundError,
    UserRoleDoesNotExist,
    SequelizeValidationError,
    UserAlreadyHasRoleError,
    NoMatchesFoundError,
};
