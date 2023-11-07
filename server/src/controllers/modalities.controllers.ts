import { type RowDataPacket } from 'mysql2'
import { connection } from '../config/db.js'

export const getModalitiesByName = async (name: string): Promise<object> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>('SELECT id_nivel_formacion FROM niveles_formacion WHERE nivel_formacion = ?', [name])
    return query[0].id_nivel_formacion
  } catch (error) {
    throw new Error()
  }
}
