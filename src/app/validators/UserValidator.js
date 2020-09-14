const EmptyFieldError = require('../errors/EmptyFieldError')
const EmailRegisteredError = require('../errors/EmailRegisteredError')
const FieldLengthError = require('../errors/FieldLengthError')
const User = require('../models/User')

class UserValidator {
  async validateRegister (body) {
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
  }
}

module.exports = new UserValidator()
