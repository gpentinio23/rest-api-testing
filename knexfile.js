// Update with your config settings.

/**
 * 
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config();
module.exports = {

  development: {
    client: 'cockroachdb',
        connection: process.env.CONNECTION_STRING + "&application_name=docs_simplecrud_knex"
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
