/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
require('dotenv').config();
const express = require('express');
const { awsS3Client } = require('../../storages/aws-s3/s3');
const { Mongoose } = require('../../storages/mongo/mongo');
const { postgres } = require('../../storages/postgres/postgres');
const {
  PG_USER,
  PG_HOST,
  PG_DATABASE,
  PG_PORT,
  PG_PASSWORD,
  MONGO_DB_URL,
  APP_PORT,
  AWS_BUCKET_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME,
} = require('./constants');
const { errorHandler } = require('./error-handler');
const { apiDataRouter } = require('./router');

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

    awsS3Client.connect({
      region: AWS_BUCKET_REGION,
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      bucketName: AWS_BUCKET_NAME,
    });
    console.info('Connect to AWS S3!');

    // TODO: cron

    const app = express();

    app.use(express.json());
    app.use(apiDataRouter);
    app.use(errorHandler);

    app.listen(APP_PORT, () => {
      console.info(`Express is listening on :${APP_PORT} port!`);
    });
  }
}

module.exports = { DataExchangeApp };
