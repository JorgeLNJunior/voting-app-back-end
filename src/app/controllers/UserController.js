const User = require('../models/User')
const UserValidator = require('../validators/UserValidator')
const { ResourceNotFoundError } = require('../helpers/Errors')
const Storage = require('../services/AzureStorage')
const bcrypt = require('bcryptjs')

class UserController {
  async show (req, res, next) {
    try {
      const users = await User.show(req.query)
      if (!users[0]) {
        throw new ResourceNotFoundError('user not found')
      }
      return res.json({ users: users })
    } catch (error) {
      next(error)
    }
  }

  async edit (req, res, next) {
    const { name, password, avatar } = req.body
    const { id } = req.params
    try {
      await UserValidator.validateEdit(req.body, id, req.UID)
      const data = {}
      /* istanbul ignore next */
      if (name) {
        data.name = name
      }
      /* istanbul ignore next */
      if (password) {
        data.password = password
      }
      /* istanbul ignore next */
      if (avatar) {
        data.avatar = avatar
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
      await UserValidator.validateDelete(id, req.UID)
      await User.delete(id)
      return res.json({ message: 'user has been deleted' })
    } catch (error) {
      next(error)
    }
  }

  async updatePassword (req, res, next) {
    const { id } = req.params
    const { oldPassword, newPassword } = req.body

    try {
      await UserValidator.validatePasswordUpdate(id, req.UID, oldPassword)

      const password = await bcrypt.hash(newPassword, 10)

      const user = await User.update(id, { password })

      return res.json({ user })
    } catch (error) {
      next(error)
    }
  }

  async avatarUpload (req, res, next) {
    const { id } = req.params
    try {
      await UserValidator.validateAvatarUpload(id, req.UID)

      const fileUrl = await Storage.storeAvatar(req.file)
      const user = await User.update(id, { avatar: fileUrl })
      return res.json({ user })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()
