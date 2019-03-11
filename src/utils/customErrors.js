class Pdf4meClientError extends Error {
  constructor(message) {
    super(message)

    // set instanceof correctly
    Object.setPrototypeOf(this, Pdf4meClientError.prototype)

    // stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Pdf4meClientError)
    }

    // Debugging info
    this.message = message
    this.name = this.constructor.name
  }
}

class Pdf4meBackendError extends Error {
  constructor(statusCode, message, traceId) {
    super(message)
    // set instanceof correctly
    Object.setPrototypeOf(this, Pdf4meBackendError.prototype)

    // stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Pdf4meBackendError)
    }

    // Debugging info
    this.message = message
    this.statusCode = statusCode
    this.traceId = traceId
    this.name = this.constructor.name
  }
}

module.exports = {
  Pdf4meClientError,
  Pdf4meBackendError,
}
