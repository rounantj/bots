require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const {
  NODE_ENV,
  SERVER_HOST,
  SERVER_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_STRING_CONNECTION,
  DB_PORT,
  CORS_ORIGIN,
  LOG_DISABLED,
} = process.env

module.exports = {
  logDisabled: LOG_DISABLED,
  environment: NODE_ENV,
  host: SERVER_HOST,
  serverPort: SERVER_PORT,
  dbName: DB_NAME,
  dbUser: DB_USERNAME,
  dbPass: DB_PASSWORD,
  dbHost: DB_HOST,
  dbStringConnection: DB_STRING_CONNECTION,
  dbPort: DB_PORT,
  corsOrigin: '*',
}
