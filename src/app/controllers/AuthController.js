const User = require('../models/User')
const UserValdator = require('../validators/UserValidator')

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
      return res.status(500).json({ error: 'internal error' })
    }
  }
}

module.exports = new AuthController()
