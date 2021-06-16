"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.BadRequestError = exports.UnauthorizedError = exports.InternalServerError = exports.NotFoundError = void 0;
class ErrorResponse extends Error {
    constructor(message, statusCode, source) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.source = source;
    }
}
class NotFoundError extends ErrorResponse {
    constructor(message = "Not Found", source) {
        super(message, 404, source);
        this.message = message;
    }
}
exports.NotFoundError = NotFoundError;
class InternalServerError extends ErrorResponse {
    constructor(message = "Internal Server Error", source) {
        super(message, 500, source);
        this.message = message;
    }
}
exports.InternalServerError = InternalServerError;
class UnauthorizedError extends ErrorResponse {
    constructor(message = "Unauthorized Request", source) {
        super(message, 401, source);
        this.message = message;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class BadRequestError extends ErrorResponse {
    constructor(message = "Bad Request", source) {
        super(message, 400, source);
        this.message = message;
    }
}
exports.BadRequestError = BadRequestError;
class ForbiddenError extends ErrorResponse {
    constructor(message = "Forbidden", source) {
        super(message, 403, source);
        this.message = message;
    }
}
exports.ForbiddenError = ForbiddenError;
exports.default = ErrorResponse;
