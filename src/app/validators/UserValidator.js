const EmptyFieldError = require('../errors/EmptyFieldError')
const EmailRegisteredError = require('../errors/EmailRegisteredError')
const FieldLengthError = require('../errors/FieldLengthError')
const InvalidEmailError = require('../errors/InvalidEmailError')
const User = require('../models/User')

class UserValidator {
  async validateRegister (body) {
    const EMAIL_REGEX = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

    if (!body.name) {
      throw new EmptyFieldError('name')
    }
    if (!body.email) {
      throw new EmptyFieldError('email')
    }
    if (!body.password) {
      throw new EmptyFieldError('password')
    }
    if (body.password.length > 20) {
      throw new FieldLengthError('password', 20)
    }
    if (await User.getByEmail(body.email)) {
      throw new EmailRegisteredError()
    }
    if (!EMAIL_REGEX.test(body.email.toLowerCase())) {
      throw new InvalidEmailError()
    }
  }
}

module.exports = new UserValidator()
