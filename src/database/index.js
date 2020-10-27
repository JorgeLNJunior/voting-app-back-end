const knexfile = require('../../knexfile')
const knex = require('knex')(knexfile[
  process.env.NODE_ENV === 'test'
    ? 'test'
    : process.env.NODE_ENV === 'production'
      ? 'production'
      : 'development'
])

module.exports = knex
