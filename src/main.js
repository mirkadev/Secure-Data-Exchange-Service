const { DataExchangeApp } = require('./infra/http/app');

const app = new DataExchangeApp();
app.run();
