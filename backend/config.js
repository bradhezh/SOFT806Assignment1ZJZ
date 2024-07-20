require('dotenv').config()

const config = require('../config')

const NODE_ENV = process.env.NODE_ENV
const NODE_ENV_PRD = 'prod'
const NODE_ENV_TST = 'test'
const NODE_ENV_DEV = 'dev'

const PORT = process.env.PORT || 3000

const MONGO_URL =
  NODE_ENV === 'test' ? process.env.TEST_DB_URL : process.env.DB_URL

const SECRET = process.env.SECRET
const SALT = Number(process.env.SALT)

module.exports = {
  NODE_ENV,
  NODE_ENV_PRD,
  NODE_ENV_TST,
  NODE_ENV_DEV,
  PORT,
  MONGO_URL,
  SECRET,
  SALT,
  USERS_ROUTE: config.USERS_ROUTE,
  LOGIN_ROUTE: config.LOGIN_ROUTE,
}
