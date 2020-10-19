const User = require('../models/User')
const UserValidator = require('../validators/UserValidator')
const { ResourceNotFoundError, UnauthorizedError } = require('../helpers/Errors')

class UserController {
  async show (req, res, next) {
    try {
      console.log(req.query)
      const users = await User.show(req.query)
      if (!users[0]) {
        throw new ResourceNotFoundError('user not found')
      }
      return res.json({ users: users })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async edit (req, res, next) {
    const { name, password } = req.body
    const { id } = req.params
    try {
      if (!await User.getByID(id)) {
        throw new ResourceNotFoundError('user not found')
      }
      UserValidator.validateEdit(req.body, id, req.UID)
      const data = {}
      /* istanbul ignore next */
      if (name) {
        data.name = name
      }
      /* istanbul ignore next */
      if (password) {
        data.password = password
      }
      const user = await User.update(id, data)
      return res.json({ user: user })
    } catch (error) {
      next(error)
    }
  }

  async delete (req, res, next) {
    const { id } = req.params
    try {
      if (!await User.getByID(id)) {
        throw new ResourceNotFoundError('user not found')
      }
      // eslint-disable-next-line
      if (req.UID != id) {
        throw new UnauthorizedError('unauthorized')
      }
      await User.delete(id)
      return res.json({ message: 'user has been deleted' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()
