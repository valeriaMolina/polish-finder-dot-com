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

module.exports = {
    BrandNotFoundError,
    PolishAlreadyExistsError,
    BrandAlreadyExistsError,
};
