const migrations = [
  {
    name: 'Create table data_log',
    command: `CREATE TABLE IF NOT EXISTS
    "data_log"
  (
    "id" serial PRIMARY KEY,
    "filename" char(100) NOT NULL,
    "shareCode" char(300) NOT NULL,
    "expirationTime" timestamp NOT NULL,
    "currentDate" timestamp DEFAULT current_timestamp
  );`,
  },

  {
    name: 'Create table clear_code',
    command: `CREATE TABLE IF NOT EXISTS
    "clear_code"
  (
    "id" serial PRIMARY KEY,
    "code" char(100) NOT NULL
  );`,
  },
];

module.exports = migrations;
