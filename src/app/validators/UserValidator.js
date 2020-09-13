const EmptyFieldError = require('../errors/EmptyFieldError')
const EmailRegisteredError = require('../errors/EmailRegisteredError')
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
    if (await User.getByEmail(body.email)) {
      console.log('erro')
      throw new EmailRegisteredError()
    }
  }
}

module.exports = new UserValidator()
