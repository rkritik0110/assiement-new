export class BaseError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export class BadRequestError extends BaseError {
    constructor(message: string) {
      super(message, 400);
    }
  }
  
  export class UnauthorizedError extends BaseError {
    constructor(message: string) {
      super(message, 401);
    }
  }
  
  export class NotFoundError extends BaseError {
    constructor(message: string) {
      super(message, 404);
    }
  }
  
  export class InternalServerError extends BaseError {
    constructor(message: string = 'Internal server error') {
      super(message, 500);
    }
  }
  