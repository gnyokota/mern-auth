class ErrorResponse extends Error {
  constructor(
    readonly message: string,
    readonly statusCode: number,
    readonly source?: Error
  ) {
    super();
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(readonly message: string = "Not Found", source?: Error) {
    super(message, 404, source);
  }
}

export class InternalServerError extends ErrorResponse {
  constructor(
    readonly message: string = "Internal Server Error",
    source?: Error
  ) {
    super(message, 500, source);
  }
}

export class UnauthorizedError extends ErrorResponse {
  constructor(
    readonly message: string = "Unauthorized Request",
    source?: Error
  ) {
    super(message, 401, source);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(readonly message: string = "Bad Request", source?: Error) {
    super(message, 400, source);
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor(readonly message: string = "Forbidden", source?: Error) {
    super(message, 403, source);
  }
}

export default ErrorResponse;
