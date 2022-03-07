const loadEnv = (envName) => {
  if (process.env[envName]) {
    return process.env[envName];
  }

  throw new Error(`Cannot load next env: ${envName}`);
};

module.exports = {
  MONGO_DB_URL: loadEnv('MONGO_DB_URL'),
  PG_HOST: loadEnv('PG_HOST'),
  PG_USER: loadEnv('PG_USER'),
  PG_DATABASE: loadEnv('PG_DATABASE'),
  PG_PASSWORD: loadEnv('PG_PASSWORD'),
  PG_PORT: loadEnv('PG_PORT'),
};
