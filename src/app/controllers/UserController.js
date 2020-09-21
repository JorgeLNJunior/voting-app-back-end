const User = require('../models/User')
const UserValidator = require('../validators/UserValidator')
const { ResourceNotFoundError } = require('../helpers/Errors')

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
    const { id } = req.params
    try {
      UserValidator.validateEdit(req.body, id, req.UID)
      const data = {}
      if (name) {
        data.name = name
      }
      if (password) {
        data.password = password
      }
      const user = await User.update(id, data)
      return res.json({ user: user })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()
