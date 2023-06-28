import { type Request, type Response, type RequestHandler } from 'express'
import { handleHTTP } from '../errors/errorsHandler.js'
import { DbError, type CustomError } from '../errors/customErrors.js'
import { connection } from '../config/db.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { type changeStatusData } from '../interfaces/changeStatusId.interfaces.js'

export const changeStatusId: RequestHandler<{ nombreTabla: string, idNombreTabla: string, id: string, estado: string }, Response, changeStatusData> = async (req: Request, res: Response): Promise<Response> => {
  const { nombreTabla, idNombreTabla, estado } = req.body
  const { id } = req.params
  const idNumber = Number(id)
  try {
    const [data] = await connection.query('UPDATE ? SET estado = ? WHERE ? = ?', [nombreTabla, estado, idNombreTabla, idNumber])
    if (!Array.isArray(data) || data?.length === 0) throw new DbError(`No se ha podido actualizar el estado del ${idNombreTabla as string} de la tabla ${nombreTabla as string}`)
    return res.status(httpStatus.OK).json({ message: 'El estado ha sido modificado correctamente' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}
