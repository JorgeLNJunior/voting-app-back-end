const User = require('../models/User')
const UserValdator = require('../validators/UserValidator')
const bcrypt = require('bcryptjs')
const AuthService = require('../services/AuthService')

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

  async login (req, res) {
    const { email, password } = req.body
    try {
      const user = await User.getByEmail(email)
      if (!user) {
        return res.status(400).json({ error: 'unregistered email' })
      }
      if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ error: 'invalid credentials ' })
      }
      const token = AuthService.generateToken(user.id)
      return res.json({ token: token })
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ error: 'internal error' })
    }
  }
}

module.exports = new AuthController()
