/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable global-require */
const migrations = require('./migrations/migrations');

class Postgres {
  constructor() {
    this.pg = require('pg');
    this.pool = new this.pg.Pool();
  }

  getPool() {
    return this.pool;
  }

  async connectPool({ user, host, database, password, port, ...rest }) {
    this.user = user;
    this.host = host;
    this.database = database;
    this.password = password;
    this.port = port;

    this.connected = false;

    this.pool = new this.pg.Pool({
      user,
      host,
      database,
      password,
      port,
      ...rest,
    });

    await this.pool.query('SELECT NOW()');
  }

  async applyMigrations() {
    for (const migration of migrations) {
      try {
        await this.pool.query(migration.command);
      } catch (error) {
        throw new Error(`Migration: cannot apply nex migration: ${migration.name} ${error}`);
      }
    }
  }
}

module.exports = { Postgres };
