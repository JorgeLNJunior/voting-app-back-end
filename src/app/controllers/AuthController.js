const User = require('../models/User')

class AuthController {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      return res.json(user)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'internal error' })
    }
  }
}

module.exports = new AuthController()
