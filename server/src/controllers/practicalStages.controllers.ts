import { type RequestHandler, type Request, type Response } from 'express'
import { connection } from '../config/db.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { DbErrorNotFound, type CustomError, DbError } from '../errors/customErrors.js'
import { type PracticalStages } from '../interfaces/PracticalStages.interfaces.js'

export const getPracticalStages = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [practicalStages] = await connection.query('SELECT * FROM modalidades_etapa_practica')
    if (Array.isArray(practicalStages) && practicalStages.length === 0) throw new DbErrorNotFound('No se encontraron modalidades de etapa práctica')
    return res.status(httpStatus.OK).json({ data: practicalStages })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getPracticalStageById: RequestHandler<{ id: string }, Response, PracticalStages> = async ({ params }: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id } = params
  const idNumber = Number(id)
  try {
    const [practicalStage] = await connection.query('SELECT * FROM modalidades_etapa_practica WHERE id_modalidad_etapa_practica = ?', [idNumber])
    return res.status(httpStatus.OK).json({ data: practicalStage })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const createPracticalStage: RequestHandler<{}, Response, PracticalStages> = async ({ body }: Request<{}>, res: Response): Promise<Response> => {
  const { tipo_modalidad_practica, num_horas_minimas_modalidad_practica, num_horas_maximas_modalidad_practica } = body
  try {
    await connection.query('INSERT INTO modalidades_etapa_practica (tipo_modalidad_practica,num_horas_minimas_modalidad_practica,num_horas_maximas_modalidad_practica) VALUE (?, IFNULL(?, 0), IFNULL(?, 0))', [tipo_modalidad_practica, num_horas_minimas_modalidad_practica, num_horas_maximas_modalidad_practica])
    return res.status(httpStatus.CREATED).json({ message: 'Modalidad de etapa práctica creada con éxito' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const editPracticalStage: RequestHandler<{}, Response, PracticalStages> = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const { tipo_modalidad_practica, num_horas_minimas_modalidad_practica, num_horas_maximas_modalidad_practica } = req.body
  const idNumber = Number(id)
  try {
    const [practicalStage] = await connection.query('UPDATE modalidades_etapa_practica SET tipo_modalidad_practica = IFNULL(?, tipo_modalidad_practica), num_horas_minimas_modalidad_practica = IFNULL(?, num_horas_minimas_modalidad_practica), num_horas_maximas_modalidad_practica = IFNULL(?, num_horas_maximas_modalidad_practica) WHERE id_modalidad_practica = ?', [
      tipo_modalidad_practica,
      num_horas_minimas_modalidad_practica,
      num_horas_maximas_modalidad_practica,
      idNumber
    ])
    if (!Array.isArray(practicalStage) && practicalStage?.affectedRows === 0) throw new DbError('No se pudo actualizar la modalidad de etapa práctica')
    return res.status(httpStatus.OK).json({ message: 'Modalidad de etapa práctica actualizada con éxito' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}
