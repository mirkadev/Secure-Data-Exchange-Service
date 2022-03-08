/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
require('dotenv').config();
const { Mongoose } = require('../../storages/mongo/mongo');
const { postgres } = require('../../storages/postgres/postgres');
const { PG_USER, PG_HOST, PG_DATABASE, PG_PORT, PG_PASSWORD, MONGO_DB_URL } = require('./constants');

class DataExchangeApp {
  async run() {
    const mongoose = new Mongoose();
    await mongoose.connect(MONGO_DB_URL);
    console.info('Connected to MongoDB!');

    await postgres.connectPool({
      user: PG_USER,
      host: PG_HOST,
      database: PG_DATABASE,
      password: PG_PASSWORD,
      port: PG_PORT,
    });
    console.info('Connected to Postgres!');

    await postgres.applyMigrations();
    console.info('Postgres migrations was applied!');

    // TODO: cron
  }
}

module.exports = { DataExchangeApp };
