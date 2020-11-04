
exports.up = function (knex) {
  return knex.schema.table('users', table => {
    table.string('avatar')
      .defaultTo('https://picsum.photos/200/200')
  })
}

exports.down = function (knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('avatar')
  })
}
