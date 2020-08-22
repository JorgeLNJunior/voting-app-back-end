// Update with your config settings.

module.exports = {

  test: {
    client: 'sqlite3',
    connection: {
      filename: './__tests__/database.sqlite'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    },
    useNullAsDefault: true
  },

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      database: process.env.DB_NAME || 'voting_app',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      database: process.env.DB_NAME || 'voting_app',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  }

}
