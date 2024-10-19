require('dotenv').config();

module.exports = {
  development: {
    username: process.env.POSTGRES_DB_USERNAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    host: process.env.POSTGRES_DB_HOST,
    port: process.env.POSTGRES_DB_PORT,
    dialect: process.env.POSTGRES_DB_DIALECT,
  },
  test: {
    username: process.env.POSTGRES_TEST_DB_USERNAME,
    password: process.env.POSTGRES_TEST_DB_PASSWORD,
    database: process.env.POSTGRES_TEST_DB_NAME,
    host: process.env.POSTGRES_TEST_DB_HOST,
    port: process.env.POSTGRES_TEST_DB_PORT,
    dialect: process.env.POSTGRES_TEST_DB_DIALECT,
  },
  production: {
    username: process.env.POSTGRES_PROD_DB_USERNAME,
    password: process.env.POSTGRES_PROD_DB_PASSWORD,
    database: process.env.POSTGRES_PROD_DB_NAME,
    host: process.env.POSTGRES_PROD_DB_HOST,
    port: process.env.POSTGRES_PROD_DB_PORT,
    dialect: process.env.POSTGRES_PROD_DB_DIALECT,
  },
};
