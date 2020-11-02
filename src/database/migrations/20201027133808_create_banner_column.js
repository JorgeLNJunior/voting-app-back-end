
exports.up = function (knex) {
  return knex.schema.table('surveys', table => {
    table.string('banner').defaultTo('https://picsum.photos/900/300')
  })
}

exports.down = function (knex) {
  return knex.schema.table('surveys', table => {
    table.dropColumn('banner')
  })
}
