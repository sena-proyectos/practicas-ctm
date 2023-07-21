import { type RequestHandler, type Request, type Response } from 'express'
import { connection } from '../config/db.js'
import { errorCodes } from '../models/errorCodes.enums.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { DbErrorNotFound, type CustomError } from '../errors/customErrors.js'

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
    const [student] = await connection.query('SELECT * FROM aprendices WHERE CONCAT(nombre_aprendiz, " ", apellido_aprendiz) LIKE ?', [`%${nombreCompleto as string}%`])
    if (!Array.isArray(student) || student?.length === 0) throw new DbErrorNotFound('No se encontró el estudiante.', errorCodes.ERROR_GET_STUDENT)
    return res.status(httpStatus.OK).json({ data: student })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getDetailInfoStudent: RequestHandler<{ classNumber: string }, Response, unknown> = async (req: Request<{ classNumber: string }>, res: Response): Promise<Response> => {
  const { classNumber } = req.query
  const parsedClassNumber = Number(classNumber)
  // const date = new Date()
  try {
    // const [students] = await connection.query(`SELECT aprendices.email_aprendiz, aprendices.numero_documento_aprendiz, aprendices.celular_aprendiz, fichas.nombre_programa_formacion, fichas.numero_ficha, niveles_formacion.nivel_formacion, CASE WHEN fichas.fecha_inicio_practica >= "${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}" THEN 'Prácticas' ELSE 'Lectiva' END AS etapa_formacion, modalidades.nombre_modalidad, fichas.fecha_fin_lectiva, fichas.fecha_inicio_practica, empresas.nombre_empresa, jefes.nombre_jefe, jefes.cargo_jefe, jefes.email_jefe, jefes.numero_contacto_jefe, arl.nombre_arl FROM aprendices, fichas INNER JOIN niveles_formacion ON fichas.id_nivel_formacion = niveles_formacion.id_nivel_formacion INNER JOIN modalidades ON aprendices.id_modalidad = modalidades.id_modalidad INNER JOIN empresas ON aprendices.id_empresa = empresas.id_empresa INNER JOIN jefes ON aprendices.id_jefe = jefes.id_jefe INNER JOIN arl ON aprendices.id_arl = arl.id_arl WHERE aprendices.id_aprendiz = 1`, [parsedClassNumber])
    /* TODO:
    SELECT
aprendices.email_aprendiz, aprendices.numero_documento_aprendiz, aprendices.celular_aprendiz,
fichas.nombre_programa_formacion, fichas.numero_ficha,
niveles_formacion.nivel_formacion, CASE WHEN fichas.fecha_inicio_practica >= "2023-07-21" THEN 'Prácticas' ELSE 'Lectiva' END AS etapa_formacion,
modalidades.nombre_modalidad,
fichas.fecha_fin_lectiva, fichas.fecha_inicio_practica,
empresas.nombre_empresa,
jefes.nombre_jefe, jefes.cargo_jefe, jefes.email_jefe, jefes.numero_contacto_jefe, arl.nombre_arl
FROM aprendices, fichas
INNER JOIN niveles_formacion ON fichas.id_nivel_formacion = niveles_formacion.id_nivel_formacion
INNER JOIN modalidades ON aprendices.id_modalidad = modalidades.id_modalidad
INNER JOIN empresas ON aprendices.id_empresa = empresas.id_empresa
INNER JOIN jefes ON aprendices.id_jefe = jefes.id_jefe
INNER JOIN arl ON aprendices.id_arl = arl.id_arl; */
    // if (!Array.isArray(students) || students?.length === 0) throw new DbErrorNotFound('No se encontraron estudiantes en esta clase.', errorCodes.ERROR_GET_STUDENTS)
    return res.status(httpStatus.OK).json({ data: parsedClassNumber })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const createStudents = async (req: Request, res: Response): Promise<Response> => {
  const students = req.body
  try {
    const createdStudents = []
    for (const student of students) {
      const {
        nombre_aprendiz,
        apellido_aprendiz,
        tipo_documento_aprendiz,
        numero_documento_aprendiz,
        email_aprendiz,
        celular_aprendiz,
        fecha_fin_practica_aprendiz,
        estado_aprendiz,
        id_empresa,
        id_modalidad,
        id_jefe,
        id_arl
      } = student
      const [result] = await connection.query('INSERT INTO aprendices (nombre_aprendiz, apellido_aprendiz, tipo_documento_aprendiz, numero_documento_aprendiz, email_aprendiz, celular_aprendiz, fecha_fin_practica_aprendiz, estado_aprendiz, id_empresa, id_modalidad, id_jefe, id_arl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre_aprendiz, apellido_aprendiz, tipo_documento_aprendiz, numero_documento_aprendiz, email_aprendiz, celular_aprendiz, fecha_fin_practica_aprendiz, estado_aprendiz, id_empresa, id_modalidad, id_jefe, id_arl])
      if (!Array.isArray(result) || result.length === 0) {
        throw new DbErrorNotFound('No se pudo crear el estudiante.', errorCodes.ERROR_CREATE_STUDENT)
      }
      createdStudents.push(result)
    }

    return res.status(httpStatus.CREATED).json({ data: { infoStudents: createStudents, msg: 'Aprendices creados' } })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}
