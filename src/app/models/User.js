const knex = require('../../database/index')
const bcrypt = require('bcryptjs')
const Storage = require('../services/storage/IndexStorage')

class User {
  async create (data) {
    const { name, email, password } = data

    const hash = await bcrypt.hash(password, 10)

    const id = await knex('users').insert({
      name: name,
      email: email,
      password: hash
    })
    const user = await knex('users').where({ id }).first()
    return user
  }

  async show (query) {
    const limit = Number(query.limit) || 20
    if (query.limit) delete query.limit

    const user = await knex('users').where(query).orderByRaw('rand()').limit(limit)
    return user
  }

  async update (id, data) {
    const uid = await knex('users').update(data).where({ id })
    const user = await knex('users').where({ id: uid }).first()
    return user
  }

  async delete (id) {
    const data = await knex('users').delete().where({ id })
    return data
  }

  async updateAvatar (userId, avatarFile) {
    const url = await Storage.storeUserAvatar(avatarFile)

    await knex('users').update({ avatar: url }).where({ id: userId })
    const user = await knex('users').where({ id: userId }).first()
    return user
  }

  async getVotes (userId) {
    const votes = await knex('votes').where({
      user_id: userId
    })

    return votes
  }
}

module.exports = new User()
