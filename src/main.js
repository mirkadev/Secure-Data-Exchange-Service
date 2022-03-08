/* eslint-disable no-console */
const { DataExchangeApp } = require('./infra/http/app');

const app = new DataExchangeApp();
app.run();

process.on('uncaughtException', (data) => {
  console.errror('Unexpected uncaughtException error!', data);
});

process.on('unhandledRejection', (data) => {
  console.errror('Unexpected unhandledRejection error!', data);
});
