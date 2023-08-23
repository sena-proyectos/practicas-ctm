import { type RequestHandler, type Request, type Response } from 'express'
import { connection } from '../config/db.js'
import { type CustomError, DbErrorNotFound } from '../errors/customErrors.js'
import { errorCodes } from '../models/errorCodes.enums.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { type id } from '../interfaces/users.interfaces.js'
import { type classes } from '../interfaces/classes.interfaces.js'

/**
 * La función `getClasses` recupera una lista de clases de una base de datos y las devuelve como una
 * respuesta JSON.
 * @param {Request} _req - El parámetro `_req` es del tipo `Request`, que representa la solicitud HTTP
 * recibida por el servidor. Contiene información como el método de solicitud, los encabezados, los
 * parámetros de consulta y el cuerpo.
 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se devolverá al cliente. Se
 * utiliza para enviar la respuesta HTTP con los datos de las clases o un mensaje de error.
 * @returns una promesa que se resuelve en un objeto de respuesta.
 */
export const getClasses = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [classes] = await connection.query('SELECT fichas.id_ficha, fichas.numero_ficha, fichas.nombre_programa_formacion, fichas.fecha_fin_lectiva, fichas.fecha_inicio_practica, CASE WHEN curdate() > fichas.fecha_fin_lectiva THEN "Práctica" ELSE "Lectiva" end as estado, CONCAT(usuarios_seguimiento.nombres_usuario, " ", usuarios_seguimiento.apellidos_usuario) as seguimiento_nombre_completo, CONCAT(usuarios_lider.nombres_usuario, " ", usuarios_lider.apellidos_usuario) as lider_nombre_completo FROM fichas INNER JOIN usuarios as usuarios_seguimiento ON fichas.id_instructor_seguimiento = usuarios_seguimiento.id_usuario INNER JOIN usuarios as usuarios_lider ON fichas.id_instructor_lider = usuarios_lider.id_usuario;')
    if (!Array.isArray(classes) || classes?.length === 0) throw new DbErrorNotFound('No hay fichas registradas.', errorCodes.ERROR_GET_CLASSES)

    return res.status(httpStatus.OK).json({ data: classes })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

/**
 * Esta función de TypeScript recupera los detalles de la clase en función de un parámetro
 * "numero_ficha" determinado.
 * @param {Request} req - El parámetro `req` es el objeto de solicitud que contiene información sobre
 * la solicitud HTTP entrante, como encabezados, parámetros de consulta y cuerpo de la solicitud. En
 * este caso, es del tipo `Request` de la biblioteca Express.js.
 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se usa para enviar la
 * respuesta HTTP al cliente. Es una instancia de la clase `Respuesta` del marco Express.
 * @returns una promesa que se resuelve en un objeto de respuesta.
 */
export const getClassDetail: RequestHandler<{}, Response, classes> = async (req: Request, res: Response): Promise<Response> => {
  const { numero_ficha } = req.body
  try {
    const [classes] = await connection.query('SELECT * FROM detalles_fichas_aprendices', [numero_ficha])
    if (!Array.isArray(classes) || classes?.length === 0) throw new DbErrorNotFound('No hay detalles de fichas.', errorCodes.ERROR_GET_CLASSES)
    return res.status(httpStatus.OK).json({ data: classes })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

/**
 * Esta función de TypeScript recupera datos de clase de una base de datos en función del ID
 * proporcionado.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP entrante, como encabezados, parámetros de consulta y cuerpo de la solicitud.
 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se usa para enviar la
 * respuesta HTTP al cliente. Es una instancia de la clase `Respuesta` del marco Express.
 * @returns una promesa que se resuelve en un objeto de respuesta.
 */
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

/**
 * Esta función de TypeScript recupera una clase por la identificación del maestro de seguimiento de una base de
 * datos.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP entrante, como los encabezados de la solicitud, los parámetros de la solicitud, el
 * cuerpo de la solicitud, etc. En este caso, es del tipo `Request<{ id: string }>` , lo que significa
 * que es un objeto de solicitud con un parámetro `id
 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se usa para enviar la
 * respuesta HTTP al cliente. Es una instancia de la clase `Respuesta` del marco Express.
 * @returns una promesa que se resuelve en un objeto de respuesta.
 */
export const getClassByPracticalInstructorId: RequestHandler<{ id: string }, Response, id> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id } = req.params
  const idNumber = Number(id)
  try {
    const [classData] = await connection.query('SELECT * FROM fichas WHERE id_instructor_seguimiento = ?', [idNumber])
    if (!Array.isArray(classData) || classData?.length === 0) throw new DbErrorNotFound('No se encontraron clases del instructor de seguimiento.', errorCodes.ERROR_GET_CLASS)
    return res.status(httpStatus.OK).json({ data: classData })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

/**
 * Esta función de TypeScript recupera una clase de una base de datos en función de su número de clase
 * y devuelve el resultado como una respuesta JSON.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP entrante, como los encabezados de solicitud, los parámetros de consulta y el cuerpo.
 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se usa para enviar la
 * respuesta HTTP al cliente. Contiene métodos y propiedades para configurar el estado de la respuesta,
 * los encabezados y el cuerpo.
 * @returns una promesa que se resuelve en un objeto de respuesta.
 */
export const getClassByClassNumber: RequestHandler<{ numero_ficha: string }, Response, classes> = async (req: Request<{ numero_ficha: string }>, res: Response): Promise<Response> => {
  const { numero_ficha } = req.query
  const classNumber = Number(numero_ficha)
  try {
    const [classQuery] = await connection.query('SELECT * FROM fichas WHERE numero_ficha = ?', [classNumber])
    if (!Array.isArray(classQuery) || classQuery?.length === 0) throw new DbErrorNotFound('No se encontró la ficha.', errorCodes.ERROR_GET_CLASS)
    return res.status(httpStatus.OK).json({ data: classQuery })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

/**
 * Esta función de TypeScript crea un registro de clase en una tabla de base de datos.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP entrante, como encabezados, parámetros de consulta y el cuerpo de la solicitud.
 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se devolverá al cliente. Se
 * utiliza para enviar la respuesta HTTP con el código de estado y los datos apropiados.
 * @returns una promesa que se resuelve en un objeto de respuesta.
 */
export const createClass: RequestHandler<{}, Response, classes> = async (req: Request<{}>, res: Response): Promise<Response> => {
  const { numero_ficha, nombre_programa_formacion, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_inicio_practica, id_instructor_seguimiento, id_instructor_lider, id_nivel_formacion } = req.body
  const classNumber = Number(numero_ficha)
  const leaderTeacherNumber = Number(id_instructor_seguimiento)
  const practicalTeacherNumber = Number(id_instructor_lider)
  const formationNumber = Number(id_nivel_formacion)
  try {
    const [classQuery] = await connection.query('INSERT INTO fichas (numero_ficha, nombre_programa_formacion, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_inicio_practica, id_instructor_seguimiento, id_instructor_lider, id_nivel_formacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [classNumber, nombre_programa_formacion, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_inicio_practica, leaderTeacherNumber, practicalTeacherNumber, formationNumber])
    if (!Array.isArray(classQuery) && classQuery?.affectedRows === 0) throw new DbErrorNotFound('No se pudo crear la ficha.', errorCodes.ERROR_CREATE_CLASS)
    return res.status(httpStatus.OK).json({ data: classQuery })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

/**
 * La función anterior es un controlador de solicitudes asincrónicas en TypeScript que actualiza un
 * registro de clase en una base de datos según los parámetros proporcionados.
 * @param req - El parámetro `req` es un objeto que representa la solicitud HTTP realizada al servidor.
 * Contiene información como el método de solicitud, los encabezados, los parámetros de consulta y el
 * cuerpo de la solicitud.
 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se devolverá al cliente. Se
 * utiliza para enviar la respuesta HTTP con los datos de clase actualizados o un mensaje de error.
 * @returns una promesa que se resuelve en un objeto de respuesta.
 */
export const editClass: RequestHandler<{ id: string }, Response, classes> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id } = req.params
  const idNumber = Number(id)
  const { numero_ficha, nombre_programa_formacion, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_inicio_practica, id_instructor_seguimiento, id_instructor_lider, id_nivel_formacion } = req.body
  const classNumber = Number(numero_ficha)
  const leaderTeacherNumber = Number(id_instructor_seguimiento)
  const practicalTeacherNumber = Number(id_instructor_lider)
  const formationNumber = Number(id_nivel_formacion)
  try {
    const [classQuery] = await connection.query('UPDATE fichas SET numero_ficha = IFNULL(?, numero_ficha), nombre_programa_formacion = IFNULL(?, nombre_programa_formacion), fecha_inicio_lectiva = IFNULL(?, fecha_inicio_lectiva), fecha_fin_lectiva = IFNULL(?, fecha_fin_lectiva), fecha_inicio_practica = IFNULL(?, fecha_inicio_practica), id_instructor_seguimiento = IFNULL(?, id_instructor_seguimiento), id_instructor_lider = IFNULL(?, id_instructor_lider), id_nivel_formacion = IFNULL(?, id_nivel_formacion) WHERE id_ficha = ?', [classNumber, nombre_programa_formacion, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_inicio_practica, practicalTeacherNumber, leaderTeacherNumber, formationNumber, idNumber])
    if (!Array.isArray(classQuery) || classQuery?.length === 0) throw new DbErrorNotFound('No se pudo editar la ficha.', errorCodes.ERROR_EDIT_CLASS)
    return res.status(httpStatus.OK).json({ data: classQuery })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

/**
 * La función `editClassDates` actualiza las fechas de inicio y finalización de una clase y la fecha de
 * inicio de una sesión de práctica en una tabla de base de datos según el número de clase
 * proporcionado.
 * @param {Request} req - El parámetro `req` es un objeto que representa la solicitud HTTP realizada al
 * servidor. Contiene información como los encabezados de la solicitud, los parámetros de la consulta y
 * el cuerpo de la solicitud.
 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se devolverá al cliente. Se
 * utiliza para enviar la respuesta HTTP con las fechas de clases actualizadas o un mensaje de error.
 * @returns una promesa que se resuelve en un objeto de respuesta.
 */
export const editClassDates: RequestHandler<{}, Response, classes> = async (req: Request, res: Response): Promise<Response> => {
  const { numero_ficha } = req.query
  const { fecha_inicio_lectiva, fecha_fin_lectiva, fecha_inicio_practica } = req.body
  const classNumber = Number(numero_ficha)
  try {
    const [classQuery] = await connection.query('UPDATE fichas SET fecha_inicio_lectiva = IFNULL(?, fecha_inicio_lectiva), fecha_fin_lectiva = IFNULL(?, fecha_fin_lectiva), fecha_inicio_practica = IFNULL(?, fecha_inicio_practica) WHERE numero_ficha LIKE ?', [fecha_inicio_lectiva, fecha_fin_lectiva, fecha_inicio_practica, classNumber])
    if (!Array.isArray(classQuery) || classQuery?.length === 0) throw new DbErrorNotFound('No se pudo editar la ficha.', errorCodes.ERROR_EDIT_CLASS)
    return res.status(httpStatus.OK).json({ data: classQuery })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

/**
 * Esta función de TypeScript actualiza el instructor práctico de una clase en una base de datos.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP realizada al servidor. Incluye propiedades como el método de solicitud, los
 * encabezados de la solicitud, el cuerpo de la solicitud y los parámetros de la solicitud.
 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se devolverá al cliente. Se
 * utiliza para enviar la respuesta HTTP con los datos actualizados o un mensaje de error.
 * @returns una promesa que se resuelve en un objeto de respuesta.
 */
export const editPracticalInstructorClass: RequestHandler<{}, Response, classes> = async (req: Request, res: Response): Promise<Response> => {
  const { numero_ficha } = req.query
  const { id_instructor_seguimiento } = req.body
  const idNumber = Number(id_instructor_seguimiento)
  const classNumberNumber = Number(numero_ficha)
  try {
    const [classQuery] = await connection.query('UPDATE fichas SET id_instructor_seguimiento = ? WHERE numero_ficha LIKE ?', [idNumber, classNumberNumber])
    if (!Array.isArray(classQuery) || classQuery?.length === 0) throw new DbErrorNotFound('No se pudo editar el instructor de prácticas de la ficha.', errorCodes.ERROR_EDIT_CLASS)
    return res.status(httpStatus.OK).json({ data: classQuery })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}
