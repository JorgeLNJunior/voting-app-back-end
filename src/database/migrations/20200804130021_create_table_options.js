
exports.up = function (knex) {
  return knex.schema.createTable('options', (table) => {
    table.increments('id')
    table.integer('survey_id')
      .references('id')
      .inTable('surveys')
      .unsigned()
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.string('name', 30).notNullable()
    table.integer('votes').notNullable().defaultTo(0)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('options')
}
