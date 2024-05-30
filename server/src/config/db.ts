import { type Pool, createPool } from 'mysql2/promise'

import { DB_USER, DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT } from './config.js'

/**
 * Crea la pool de conexión con MySQL
 * @type {Pool} connection Pool de conexión con MySQL
 * @property {string} host Host de la base de datos
 * @property {string} user Usuario de la base de datos
 * @property {string} password Contraseña de la base de datos
 * @property {string} database Base de datos a utilizar
 * @property {number} port Puerto de conexión
 * @property {boolean} waitForConnections Indica si se esperan conexiones
 */
export const connection: Pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: Number(DB_PORT),
  waitForConnections: true
})
