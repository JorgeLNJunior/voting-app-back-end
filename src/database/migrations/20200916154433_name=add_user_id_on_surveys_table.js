
exports.up = function (knex) {
  return knex.schema.table('surveys', table => {
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .unsigned()
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.table('surveys', table => {
    table.dropForeign('user_id')
  })
}
