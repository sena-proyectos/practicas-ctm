import { type Pool, createPool } from 'mysql2/promise'

import { DB_USER, DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT } from './config.js'

// create connection to database mysql
export const connection: Pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: Number(DB_PORT),
  waitForConnections: true
})
