const knex = require('../../database/index')

class User {
  async create (data) {
    const id = await knex('users').insert({
      name: data.name,
      email: data.email,
      password: data.password
    })
    const user = await knex('users').where({ id }).first()
    return user
  }
}

module.exports = new User()
