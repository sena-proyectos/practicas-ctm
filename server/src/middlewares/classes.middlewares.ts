import { type NextFunction, type Request, type Response } from 'express'
import { type CustomError, DataNotValid, NumberIsNaN } from '../errors/customErrors.js'
import { classDates, classSchema } from '../schemas/classes.schemas.js'
import { handleHTTP } from '../errors/errorsHandler.js'

/**
 * La función `checkClassData` en TypeScript valida los datos recibidos en una solicitud y arroja un
 * error si los datos no son válidos.
 * @param {Request} req - El parámetro `req` es el objeto de solicitud que contiene información sobre
 * la solicitud HTTP entrante, como los encabezados de solicitud, los parámetros de consulta y el
 * cuerpo.
 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se usa para enviar la
 * respuesta al cliente. Contiene métodos y propiedades para manipular la respuesta, como establecer el
 * código de estado, los encabezados y enviar el cuerpo de la respuesta.
 * @param {NextFunction} next - El parámetro `siguiente` es una función que se llama para pasar el
 * control a la siguiente función de middleware en el ciclo de solicitud-respuesta. Por lo general, se
 * usa para pasar a la siguiente función después de que el middleware actual haya completado su tarea.
 */
export const checkClassData = (req: Request, res: Response, next: NextFunction): void => {
  const { numero_ficha, nombre_programa_formacion, fecha_fin_lectiva, fecha_inicio_practica, id_instructor_seguimiento, id_nivel_formacion } = req.body
  try {
    const { error } = classSchema.validate({ numero_ficha, nombre_programa_formacion, fecha_fin_lectiva, fecha_inicio_practica, id_instructor_seguimiento, id_nivel_formacion })
    if (error !== undefined) throw new DataNotValid('Los datos ingresados para la ficha no son válidos')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

/**
 * La función `checkPracticalTeacherId` verifica si la ID de instructor proporcionada para prácticas es
 * un número válido.
 * @param {Request} req - El parámetro `req` es el objeto de solicitud que contiene información sobre
 * la solicitud HTTP entrante, como los encabezados de la solicitud, el cuerpo de la solicitud y los
 * parámetros de la solicitud.
 * @param {Response} res - El parámetro `res` es el objeto de respuesta que representa la respuesta
 * HTTP que se enviará al cliente. Se utiliza para enviar los datos de respuesta, como el código de
 * estado y el cuerpo de la respuesta, al cliente.
 * @param {NextFunction} next - El parámetro `siguiente` es una función que se llama para pasar el
 * control a la siguiente función de middleware en el ciclo de solicitud-respuesta. Por lo general, se
 * usa para pasar a la siguiente función después de que el middleware actual haya completado su tarea.
 */
export const checkPracticalTeacherId = (req: Request, res: Response, next: NextFunction): void => {
  const { id_instructor_seguimiento } = req.body
  const idTeacherPractical = parseInt(id_instructor_seguimiento as string, 10)
  try {
    if (isNaN(idTeacherPractical)) throw new NumberIsNaN('el id del instructor de prácticas no es un número.')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

export const checkLiderTeacherId = (req: Request, res: Response, next: NextFunction): void => {
  const { id_instructor_lider } = req.body
  const idTeacherLider = parseInt(id_instructor_lider as string, 10)
  try {
    if (isNaN(idTeacherLider)) throw new NumberIsNaN('el id del instructor lider no es un número.')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

/**
 * La función `checkClassNumber` comprueba si el número de clase proporcionado es un número válido y
 * arroja un error si no lo es.
 * @param {Request} req - El parámetro `req` es el objeto de solicitud que contiene información sobre
 * la solicitud HTTP entrante, como los encabezados de solicitud, los parámetros de consulta y el
 * cuerpo.
 * @param {Response} res - El parámetro `res` es el objeto de respuesta que se usa para enviar la
 * respuesta al cliente. Contiene métodos y propiedades que le permiten controlar la respuesta, como
 * establecer el código de estado, los encabezados y enviar el cuerpo de la respuesta.
 * @param {NextFunction} next - El parámetro `siguiente` es una función que se llama para pasar el
 * control a la siguiente función de middleware en el ciclo de solicitud-respuesta. Por lo general, se
 * usa para pasar a la siguiente función de middleware o para finalizar el ciclo de
 * solicitud-respuesta.
 */
export const checkClassNumber = (req: Request, res: Response, next: NextFunction): void => {
  const { numero_ficha } = req.query
  const classNumber = Number(numero_ficha)
  try {
    if (isNaN(classNumber)) throw new NumberIsNaN('El número de ficha ingresado no es número')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

export const checkClassDate = (req: Request, res: Response, next: NextFunction): void => {
  const { numero_ficha, fecha_inicio_lectiva, fecha_inicio_practica } = req.body
  try {
    const { error } = classDates.validate({ numero_ficha, fecha_inicio_lectiva, fecha_inicio_practica })
    if (error !== undefined) throw new DataNotValid('Los datos ingresados para la ficha no son válidos')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
