import * as util from "util";

export class Pdf4meClientException extends Error {
  constructor(message: string) {
    super(message);

    // set instanceof correctly
    Object.setPrototypeOf(this, Pdf4meClientException.prototype);

    // stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Pdf4meClientException);
    }

    // Debugging info
    this.message = message;
    this.name = this.constructor.name;
  }
}

export class Pdf4meBackendException extends Error {
  public statusCode: number;
  public traceId: string;

  constructor(statusCode: number, message: string, traceId: string) {
    super(message);
    // set instanceof correctly
    Object.setPrototypeOf(this, Pdf4meBackendException.prototype);

    // stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Pdf4meBackendException);
    }

    // Debugging info
    this.message = message;
    this.statusCode = statusCode;
    this.traceId = traceId;
    this.name = this.constructor.name;
  }
}
