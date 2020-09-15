const knex = require('../../database/index')
const bcrypt = require('bcrypt')

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

  async getByEmail (email) {
    const user = await knex('users').where({ email }).first()
    return user
  }
}

module.exports = new User()
