class GeneralError extends Error {
  constructor (message) {
    super()
    this.message = message
  }

  getCode () {
    if (this instanceof EmailRegisteredError) {
      return 400
    }
    if (this instanceof EmptyFieldError) {
      return 400
    }
    if (this instanceof FieldLengthError) {
      return 400
    }
    if (this instanceof InvalidEmailError) {
      return 400
    }
    if (this instanceof UnauthenticatedError) {
      return 401
    }
    if (this instanceof InvalidTokenError) {
      return 401
    }
    return 500
  }
}

class EmailRegisteredError extends GeneralError { }
class EmptyFieldError extends GeneralError { }
class FieldLengthError extends GeneralError { }
class InvalidEmailError extends GeneralError { }
class UnauthenticatedError extends GeneralError { }
class InvalidTokenError extends GeneralError { }

module.exports = {
  GeneralError,
  EmailRegisteredError,
  EmptyFieldError,
  FieldLengthError,
  InvalidEmailError,
  UnauthenticatedError,
  InvalidTokenError
}
