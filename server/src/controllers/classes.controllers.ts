import { type RequestHandler, type Request, type Response } from 'express'
import { connection } from '../config/db.js'
import { type CustomError, DbErrorNotFound } from '../errors/customErrors.js'
import { errorCodes } from '../models/errorCodes.enums.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { type id } from '../interfaces/users.interfaces.js'
import { type classes } from '../interfaces/classes.interfaces.js'

export const getClasses = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [classes] = await connection.query('SELECT * FROM fichas')
    if (!Array.isArray(classes) || classes?.length === 0) throw new DbErrorNotFound('No hay fichas registradas.', errorCodes.ERROR_GET_CLASSES)
    return res.status(httpStatus.OK).json({ data: classes })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getClassById: RequestHandler<{ id: string }, Response, id> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id } = req.params
  const idNumber = Number(id)
  try {
    const [classData] = await connection.query('SELECT * FROM fichas WHERE id_ficha = ?', [idNumber])
    if (!Array.isArray(classData) || classData?.length === 0) throw new DbErrorNotFound('No se encontró el estudiante.', errorCodes.ERROR_GET_CLASS)
    return res.status(httpStatus.OK).json({ data: classData })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getClassByClassNumber: RequestHandler<{ numero_ficha: string }, Response, classes> = async (req: Request<{ numero_ficha: string }>, res: Response): Promise<Response> => {
  const { numero_ficha } = req.body
  const classNumber = Number(numero_ficha)
  try {
    const [classQuery] = await connection.query('SELECT * FROM fichas WHERE numero_ficha = ?', [classNumber])
    if (!Array.isArray(classQuery) || classQuery?.length === 0) throw new DbErrorNotFound('No se encontró la ficha.', errorCodes.ERROR_GET_CLASS)
    return res.status(httpStatus.OK).json({ data: classQuery })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const createClass: RequestHandler<{}, Response, classes> = async (req: Request<{}>, res: Response): Promise<Response> => {
  const { numero_ficha, nombre_programa_formación, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_inicio_practica, fecha_fin_practica, nivel_programa_formación, jornada_ficha, id_instructor_lider_formacion, id_instructor_practicas_formacion } = req.body
  const classNumber = Number(numero_ficha)
  const leaderTeacherNumber = Number(id_instructor_lider_formacion)
  const practicalTeacherNumber = Number(id_instructor_practicas_formacion)
  try {
    const [classQuery] = await connection.query('INSERT INTO fichas (id_ficha, numero_ficha, nombre_programa_formación, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_inicio_practica, fecha_fin_practica, nivel_programa_formación, jornada_ficha, id_instructor_lider_formacion, id_instructor_practicas_formacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      classNumber,
      nombre_programa_formación,
      fecha_inicio_lectiva,
      fecha_fin_lectiva,
      fecha_inicio_practica,
      fecha_fin_practica,
      nivel_programa_formación,
      jornada_ficha,
      leaderTeacherNumber,
      practicalTeacherNumber,
    ])
    if (!Array.isArray(classQuery) || classQuery?.length === 0) throw new DbErrorNotFound('No se pudo crear la ficha.', errorCodes.ERROR_CREATE_CLASS)
    return res.status(httpStatus.OK).json({ data: classQuery })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const editClass: RequestHandler<{ id: string }, Response, classes> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id } = req.params
  const idNumber = Number(id)
  const { numero_ficha, nombre_programa_formación, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_inicio_practica, fecha_fin_practica, nivel_programa_formación, jornada_ficha, id_instructor_lider_formacion, id_instructor_practicas_formacion } = req.body
  const classNumber = Number(numero_ficha)
  const leaderTeacherNumber = Number(id_instructor_lider_formacion)
  const practicalTeacherNumber = Number(id_instructor_practicas_formacion)
  try {
    const [classQuery] = await connection.query(
      'UPDATE fichas SET numero_ficha = IFNULL(?, numero_ficha), nombre_programa_formación = IFNULL(?, nombre_programa_formación), fecha_inicio_lectiva = IFNULL(?, fecha_inicio_lectiva), fecha_fin_lectiva = IFNULL(?, fecha_fin_lectiva), fecha_inicio_practica = IFNULL(?, fecha_inicio_practica), fecha_fin_practica = IFNULL(?, fecha_fin_practica), nivel_programa_formación = IFNULL(?, nivel_programa_formación), jornada_ficha = IFNULL(?, jornada_ficha), id_instructor_lider_formacion = IFNULL(?, id_instructor_lider_formacion), id_instructor_practicas_formacion = IFNULL(?, id_instructor_practicas_formacion) WHERE id_ficha = ?',
      [classNumber, nombre_programa_formación, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_inicio_practica, fecha_fin_practica, nivel_programa_formación, jornada_ficha, leaderTeacherNumber, practicalTeacherNumber, idNumber]
    )
    if (!Array.isArray(classQuery) || classQuery?.length === 0) throw new DbErrorNotFound('No se pudo editar la ficha.', errorCodes.ERROR_EDIT_CLASS)
    return res.status(httpStatus.OK).json({ data: classQuery })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}
