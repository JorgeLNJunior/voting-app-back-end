require('dotenv').config()

module.exports = {

  test: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST_TEST || '0.0.0.0',
      database: process.env.DB_NAME_TEST || 'vtapptest',
      user: process.env.DB_USER_TEST || 'root',
      password: process.env.DB_PASSWORD_TEST || ''
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
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
