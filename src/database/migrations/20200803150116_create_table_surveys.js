
exports.up = function (knex) {
  return knex.schema.createTable('surveys', (table) => {
    table.increments('id')
    table.string('title', 50).notNullable()
    table.string('description', 150).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('surveys')
}
