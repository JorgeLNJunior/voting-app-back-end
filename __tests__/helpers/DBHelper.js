const cleaner = require('knex-cleaner')
const knex = require('../../src/database/index')

module.exports = {
  async cleanTables () {
    await cleaner.clean(knex, {
      mode: 'truncate',
      restartIdentity: true,
      ignoreTables: ['knex_migrations', 'knex_migrations_lock']
    })
  },

  async destroyConnection () {
    await knex.destroy()
  }
}
