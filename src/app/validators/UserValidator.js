const {
  EmptyFieldError,
  EmailRegisteredError,
  FieldLengthError,
  InvalidEmailError,
  UnauthorizedError
} = require('../helpers/Errors')
const User = require('../models/User')

class UserValidator {
  async validateRegister (body) {
    const EMAIL_REGEX = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

    if (!body.name) {
      throw new EmptyFieldError('field name is required')
    }
    if (!body.email) {
      throw new EmptyFieldError('field email is required')
    }
    if (!body.password) {
      throw new EmptyFieldError('field password is required')
    }
    if (body.password.length > 20) {
      throw new FieldLengthError('password field length must not be greater than 20')
    }
    if (await User.getByEmail(body.email)) {
      throw new EmailRegisteredError('this email is already registered')
    }
    if (!EMAIL_REGEX.test(body.email.toLowerCase())) {
      throw new InvalidEmailError('invalid email')
    }
  }

  validateEdit (body, id, tokenId) {
    const { name, password } = body
    if (!name && !password) {
      throw new EmptyFieldError('name or password is required')
    }
    // eslint-disable-next-line
    if (tokenId != id) {
      throw new UnauthorizedError('unauthorized')
    }
  }
}

module.exports = new UserValidator()
