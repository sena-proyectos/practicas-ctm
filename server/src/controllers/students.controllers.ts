import { type RequestHandler, type Request, type Response } from 'express'
import { connection } from '../config/db.js'
import { errorCodes } from '../models/errorCodes.enums.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { DbErrorNotFound, type CustomError } from '../errors/customErrors.js'
import { type RowDataPacket } from 'mysql2'
import { type infoStudents } from '../interfaces/students.interfaces.js'

export const getStudents = async (req: Request, res: Response): Promise<Response> => {
  try {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const page = parseInt(req.query.page as string) || 1
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const limit = parseInt(req.query.limit as string) || 10
    const offset = (Number(page) - 1) * Number(limit)

    const [students] = await connection.query('SELECT * FROM aprendices LIMIT ? OFFSET ?', [limit, offset])
    if (!Array.isArray(students) || students.length === 0) throw new DbErrorNotFound('No hay estudiantes registrados.', errorCodes.ERROR_GET_STUDENTS)

    const [total] = (await connection.query('SELECT COUNT(*) as count FROM aprendices')) as unknown as Array<{ count: number }>
    const totalPages = Math.ceil(Number(Array.isArray(total) && total[0].count) / Number(limit))

    return res.status(httpStatus.OK).json({ data: students, page, totalPages })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getStudentsById: RequestHandler<{ id: string }, Response, unknown> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id } = req.params
  const idNumber = Number(id)
  try {
    const [student] = await connection.query('SELECT * FROM aprendices WHERE id_aprendiz = ?', [idNumber])
    if (!Array.isArray(student) || student.length === 0) throw new DbErrorNotFound('No se encontró el estudiante.', errorCodes.ERROR_GET_STUDENT)
    return res.status(httpStatus.OK).json({ data: student })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getStudentByName: RequestHandler<{ nombreCompleto: string }, Response, unknown> = async (req: Request<{ nombreCompleto: string }>, res: Response): Promise<Response> => {
  const { nombreCompleto } = req.query
  try {
    const [student] = await connection.query('SELECT CONCAT(aprendices.nombre_aprendiz, " ", aprendices.apellido_aprendiz) AS nombre_completo, aprendices.email_aprendiz, aprendices.id_aprendiz, fichas.nombre_programa_formacion, fichas.numero_ficha FROM aprendices INNER JOIN detalle_fichas_aprendices ON aprendices.id_aprendiz = detalle_fichas_aprendices.id_aprendiz INNER JOIN fichas ON detalle_fichas_aprendices.id_ficha = fichas.id_ficha WHERE CONCAT(nombre_aprendiz, " ", apellido_aprendiz) LIKE ?', [`%${nombreCompleto as string}%`])
    if (!Array.isArray(student) || student?.length === 0) throw new DbErrorNotFound('No se encontró el estudiante.', errorCodes.ERROR_GET_STUDENT)
    return res.status(httpStatus.OK).json({ data: student })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getDetailInfoStudents: RequestHandler<{}, Response, unknown> = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [students] = await connection.query('SELECT CONCAT(aprendices.nombre_aprendiz, " ", aprendices.apellido_aprendiz) AS nombre_completo, aprendices.email_aprendiz, aprendices.id_aprendiz, fichas.nombre_programa_formacion, fichas.numero_ficha FROM aprendices INNER JOIN detalle_fichas_aprendices ON aprendices.id_aprendiz = detalle_fichas_aprendices.id_aprendiz INNER JOIN fichas ON detalle_fichas_aprendices.id_ficha = fichas.id_ficha', [])
    if (!Array.isArray(students) || students?.length === 0) throw new DbErrorNotFound('Error al conseguir la información de los estudiantes.', errorCodes.ERROR_GET_STUDENTS)
    return res.status(httpStatus.OK).json({ data: students })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getDetailInfoStudent: RequestHandler<{}, Response, unknown> = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  console.log(id)
  try {
    const [students] = await connection.query(
      'SELECT CONCAT(aprendices.nombre_aprendiz, " ", aprendices.apellido_aprendiz) AS nombre_completo, aprendices.email_aprendiz, aprendices.numero_documento_aprendiz, aprendices.celular_aprendiz, fichas.nombre_programa_formacion, fichas.numero_ficha, niveles_formacion.nivel_formacion, CASE WHEN fichas.fecha_inicio_practica >= fichas.fecha_fin_lectiva THEN "Prácticas" ELSE "Lectiva" END AS etapa_formacion, fichas.fecha_fin_lectiva, fichas.fecha_inicio_practica,    modalidades.nombre_modalidad, empresas.nombre_empresa, jefes.nombre_jefe, jefes.cargo_jefe, jefes.email_jefe, jefes.numero_contacto_jefe, arl.nombre_arl FROM aprendices INNER JOIN detalle_fichas_aprendices ON aprendices.id_aprendiz = detalle_fichas_aprendices.id_aprendiz INNER JOIN fichas ON detalle_fichas_aprendices.id_ficha = fichas.id_ficha INNER JOIN niveles_formacion ON fichas.id_nivel_formacion = niveles_formacion.id_nivel_formacion  INNER JOIN modalidades ON modalidades.id_modalidad = aprendices.id_modalidad INNER JOIN empresas ON aprendices.id_empresa = empresas.id_empresa INNER JOIN jefes ON aprendices.id_jefe = jefes.id_jefe INNER JOIN arl ON aprendices.id_arl = arl.id_arl WHERE aprendices.id_aprendiz = ?',
      [id]
    )
    if (!Array.isArray(students) || students?.length === 0) throw new DbErrorNotFound('Error al conseguir la información del estudiante.', errorCodes.ERROR_GET_STUDENTS)
    return res.status(httpStatus.OK).json({ data: students })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const createStudents: RequestHandler<{}, Response, infoStudents[]> = async (req: Request, res: Response): Promise<Response> => {
  const students = req.body as infoStudents[]
  try {
    let i = 0
    for (const student of students) {
      const { nombre_aprendiz, apellido_aprendiz, tipo_documento_aprendiz, numero_documento_aprendiz, email_aprendiz, celular_aprendiz, fecha_fin_practica_aprendiz, estado_aprendiz, id_empresa, id_modalidad, id_jefe, id_arl } = student
      const [result] = await connection.query('INSERT INTO aprendices (nombre_aprendiz, apellido_aprendiz, tipo_documento_aprendiz, numero_documento_aprendiz, email_aprendiz, celular_aprendiz, fecha_fin_practica_aprendiz, estado_aprendiz, id_empresa, id_modalidad, id_jefe, id_arl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre_aprendiz, apellido_aprendiz, tipo_documento_aprendiz, numero_documento_aprendiz, email_aprendiz, celular_aprendiz, fecha_fin_practica_aprendiz, estado_aprendiz, id_empresa, id_modalidad, id_jefe, id_arl])
      if ((result as RowDataPacket[]).length === 0) throw new DbErrorNotFound(`No se pudo crear el estudiante ${i}.`, errorCodes.ERROR_CREATE_STUDENT)
      i += 1
    }
    return res.status(httpStatus.CREATED).json({ data: { infoStudents: `Added ${i}`, msg: 'Aprendices creados' } })
  } catch (error) {
    console.log(error)
    return handleHTTP(res, error as CustomError)
  }
}
