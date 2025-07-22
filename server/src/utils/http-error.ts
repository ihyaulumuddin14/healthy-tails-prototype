export class HttpError extends Error {
  statusCode: number;
  name: string;
  details?: any;

  constructor(statusCode: number = 500, message: string, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}
