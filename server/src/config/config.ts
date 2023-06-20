import { config } from 'dotenv';

config();

const PORT = process.env.PORT ?? 3000
const DB_USER = process.env.DB_USER ?? 'root'
const DB_PASSWORD = process.env.DB_PASSWORD ?? 'root'
const DB_HOST = process.env.DB_HOST ?? 'practicas_sena'
const DB_DATABASE = process.env.DB_DATABASE ?? 'practicas_sena'
const DB_PORT = process.env.DB_PORT ?? 3306

export { PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT }
