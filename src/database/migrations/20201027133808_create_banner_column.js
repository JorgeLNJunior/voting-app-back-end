
exports.up = function (knex) {
  return knex.schema.table('surveys', table => {
    table.string('banner').defaultTo('https://picsum.photos/1280/720')
  })
}

exports.down = function (knex) {
  return knex.schema.table('surveys', table => {
    table.dropColumn('banner')
  })
}
