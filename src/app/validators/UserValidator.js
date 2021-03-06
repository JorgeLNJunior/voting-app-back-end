const {
  EmptyFieldError,
  EmailRegisteredError,
  FieldLengthError,
  InvalidEmailError,
  UnauthorizedError,
  ResourceNotFoundError,
  InvalidCredentialError
} = require('../helpers/Errors')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

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

    const user = await User.show({ email: body.email })
    if (user[0]) {
      throw new EmailRegisteredError('this email is already registered')
    }

    if (body.password.length > 20) {
      throw new FieldLengthError('password field length must not be greater than 20')
    }

    if (!EMAIL_REGEX.test(body.email.toLowerCase())) {
      throw new InvalidEmailError('invalid email')
    }

    if (body.email.length > 50) {
      throw new FieldLengthError('email field must be less than 50')
    }

    if (body.name.length > 50) {
      throw new FieldLengthError('name field must be less than 50')
    }
  }

  async validateEdit (id, tokenId) {
    const user = await User.show({ id })
    if (!user[0]) {
      throw new ResourceNotFoundError('user not found')
    }
    // eslint-disable-next-line
    if (tokenId != id) {
      throw new UnauthorizedError('unauthorized')
    }
  }

  async validateDelete (id, tokenId) {
    const user = await User.show({ id })
    if (!user[0]) {
      throw new ResourceNotFoundError('user not found')
    }
    // eslint-disable-next-line
    if (tokenId != id) {
      throw new UnauthorizedError('unauthorized')
    }
  }

  async validatePasswordUpdate (userId, tokenId, oldPass) {
    const user = await User.show({ id: userId })

    if (!user[0]) {
      throw new ResourceNotFoundError('user not found')
    }

    // eslint-disable-next-line
    if (tokenId != userId) {
      throw new UnauthorizedError('unauthorized')
    }

    if (!await bcrypt.compare(oldPass, user[0].password)) {
      throw new InvalidCredentialError('wrong password')
    }
  }

  async validateAvatarUpdate (userId, tokenId, avatarFile) {
    const user = await User.show({ id: userId })

    if (!user[0]) {
      throw new ResourceNotFoundError('user not found')
    }
    if (userId != tokenId) { // eslint-disable-line
      throw new UnauthorizedError('unauthorized')
    }
    if (avatarFile.size > 1000000) {
      throw new FieldLengthError('avatar size must be less than 1mb')
    }
  }
}

module.exports = new UserValidator()
