const User = require('../models/User')
const UserValdator = require('../validators/UserValidator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')

class AuthController {
  async register (req, res) {
    try {
      await UserValdator.validateRegister(req.body)
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message || 'internal error' })
    }
    try {
      const user = await User.create(req.body)
      return res.json({ user: user })
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json(error)
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
      const token = jwt.sign({
        uid: user.id,
        expiresIn: moment().add(5, 'days')
      }, process.env.APP_SECRET, { expiresIn: '5d' })
      return res.json({ token: token })
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

module.exports = new AuthController()
