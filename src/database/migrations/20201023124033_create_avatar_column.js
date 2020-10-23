
exports.up = function (knex) {
  return knex.schema.table('users', table => {
    table.string('avatar')
      .defaultTo('https://i.imgur.com/3umO0ae.png')
  })
}

exports.down = function (knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('avatar')
  })
}
