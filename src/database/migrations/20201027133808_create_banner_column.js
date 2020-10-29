
exports.up = function (knex) {
  return knex.schema.table('surveys', table => {
    table.string('banner')
  })
}

exports.down = function (knex) {
  return knex.schema.table('surveys', table => {
    table.dropColumn('banner')
  })
}
