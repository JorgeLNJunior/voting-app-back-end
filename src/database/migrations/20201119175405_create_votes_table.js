
exports.up = function (knex) {
  return knex.schema.createTable('votes', table => {
    table.increments('id')
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .unsigned()
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.integer('survey_id')
      .references('id')
      .inTable('surveys')
      .unsigned()
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.integer('option_id')
      .references('id')
      .inTable('options')
      .unsigned()
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('votes')
}
