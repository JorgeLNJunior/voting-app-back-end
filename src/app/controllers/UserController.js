const User = require('../models/User')

class UserController {
  async getByID (req, res) {
    try {
      const user = await User.getByID(req.params.id)
      if (!user) {
        return res.status(400).json({ error: 'user not found' })
      }
      return res.json({ user: user })
    } catch (error) {
      return res.status(500).json({ error: 'internal error' })
    }
  }
}

module.exports = new UserController()
