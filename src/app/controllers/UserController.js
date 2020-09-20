const User = require('../models/User')
const { ResourceNotFoundError, EmptyFieldError } = require('../helpers/Errors')

class UserController {
  async getByID (req, res, next) {
    try {
      const user = await User.getByID(req.params.id)
      if (!user) {
        throw new ResourceNotFoundError('user not found')
      }
      return res.json({ user: user })
    } catch (error) {
      next(error)
    }
  }

  async edit (req, res, next) {
    const { name, password } = req.body
    try {
      if (!name || !password) {
        throw new EmptyFieldError('name or password is required')
      }
      const data = {}
      if (name) {
        data.name = name
      }
      if (password) {
        data.password = password
      }
      const user = await User.update(req.UID, data)
      return res.json({ user: user })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()
