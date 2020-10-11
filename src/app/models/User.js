const knex = require('../../database/index')
const bcrypt = require('bcryptjs')

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

  async getByID (id) {
    const user = await knex('users').where({ id }).first()
    return user
  }

  async getByEmail (email) {
    const user = await knex('users').where({ email }).first()
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
}

module.exports = new User()
