// Update with your config settings.

export default {

  development: {
    client: 'pg',
    connection: {
      host:     process.env.DB_HOST || 'db',
      port:     process.env.DB_PORT || '5432',
      database: process.env.DB_NAME || 'liven',
      user:     process.env.DB_USER || '123456',
      password: process.env.DB_PASS || 'postgres'
    },
    migrations: {
      directory: __dirname + '/src/database/migrations',
      tableName: 'knex_migrations'
    }
  },
  
  production: {
    client: 'pg',
    connection: {
      host:     process.env.DB_HOST || '',
      port:     process.env.DB_PORT || '',
      database: process.env.DB_NAME || '',
      user:     process.env.DB_USER || '',
      password: process.env.DB_PASS || ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/src/database/migrations',
      tableName: 'knex_migrations'
    }
  },
  testing: {
    client: 'pg',
    connection: {
      host:     process.env.DB_HOST || 'db',
      port:     process.env.DB_PORT || '5432',
      database: process.env.DB_NAME || 'liven_test',
      user:     process.env.DB_USER || '123456',
      password: process.env.DB_PASS || 'postgres'
    },
    migrations: {
      directory: __dirname + '/src/database/migrations',
      tableName: 'knex_migrations'
    }
  }

};
