const User = require('../models/User')
const UserValdator = require('../validators/UserValidator')
const bcrypt = require('bcryptjs')
const AuthService = require('../services/AuthService')
const { UnregisteredEmailError, InvalidCredentialError } = require('../helpers/Errors')

class AuthController {
  async register (req, res, next) {
    try {
      await UserValdator.validateRegister(req.body)
      const user = await User.create(req.body)
      return res.json({ user: user })
    } catch (error) {
      next(error)
    }
  }

  async login (req, res, next) {
    const { email, password } = req.body
    try {
      const user = await User.show({ email })
      if (!user[0]) {
        throw new UnregisteredEmailError('unregistered email')
      }
      if (!await bcrypt.compare(password, user[0].password)) {
        throw new InvalidCredentialError('invalid credentials ')
      }
      const token = AuthService.generateToken(user[0].id)
      return res.json({ token: token })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AuthController()
