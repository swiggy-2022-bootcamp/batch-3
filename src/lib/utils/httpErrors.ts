export abstract class HTTPClientError extends Error {
    
  readonly statusCode!: number;
  readonly name!: string;
  readonly description?: string;

  constructor(message: object | string, description?: string) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.name = this.constructor.name;
    this.description = description;
    Error.captureStackTrace(this, this.constructor);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class HTTP400Error extends HTTPClientError {
  readonly statusCode = 400;

  constructor(message: string | object = "Bad Request", description?: string) {
    super(message,description);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class HTTP200Error extends HTTPClientError {
  readonly statusCode = 200;

  constructor(message: string | object = "Result not found", description?: string) {
    super(message,description);
  }
}


// tslint:disable-next-line: max-classes-per-file
export class HTTP401Error extends HTTPClientError {
  readonly statusCode = 401;

  constructor(message: string | object = "Unauthorized", description?: string) {
    super(message, description);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class HTTP403Error extends HTTPClientError {
  readonly statusCode = 403;

  constructor(message: string | object = "Forbidden", description?: string) {
    super(message, description);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class HTTP404Error extends HTTPClientError {
  readonly statusCode = 404;

  constructor(message: string | object = "Not found", description?: string) {
    super(message, description);
  }
}
// tslint:disable-next-line: max-classes-per-file
export class HTTP409Error extends HTTPClientError {
  readonly statusCode = 409;

  constructor(message: string | object = "Conflict", description?: string) {
    super(message, description);
  }
}
