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
    if (this instanceof UnregisteredEmailError) {
      return 400
    }
    if (this instanceof InvalidCredentialError) {
      return 400
    }
    if (this instanceof ResourceNotFoundError) {
      return 400
    }
    /* istanbul ignore next */
    if (this instanceof UnauthorizedError) {
      return 403
    }
    /* istanbul ignore next */
    return 500
  }
}

class EmailRegisteredError extends GeneralError { }
class EmptyFieldError extends GeneralError { }
class FieldLengthError extends GeneralError { }
class InvalidEmailError extends GeneralError { }
class UnregisteredEmailError extends GeneralError { }
class InvalidCredentialError extends GeneralError { }
class ResourceNotFoundError extends GeneralError { }
class UnauthorizedError extends GeneralError { }

module.exports = {
  GeneralError,
  EmailRegisteredError,
  EmptyFieldError,
  FieldLengthError,
  InvalidEmailError,
  UnregisteredEmailError,
  InvalidCredentialError,
  ResourceNotFoundError,
  UnauthorizedError
}
