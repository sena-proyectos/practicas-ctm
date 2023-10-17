import { type NextFunction, type Request, type Response } from 'express'
import { type CustomError, DataNotValid, NumberIsNaN } from '../errors/customErrors.js'
import { classDates, classSchema } from '../schemas/classes.schemas.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import XLSX from 'xlsx'

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
  const { numero_ficha, nombre_programa_formacion, fecha_inicio_lectiva, fecha_inicio_practica, id_instructor_seguimiento, id_nivel_formacion } = req.body
  console.log(req.body)
  try {
    const { error } = classSchema.validate({ numero_ficha, nombre_programa_formacion, fecha_inicio_lectiva, fecha_inicio_practica, id_instructor_seguimiento, id_nivel_formacion })
    console.log(error)
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

export const readExcelFileClasses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { file } = req
  try {
    if (file === undefined) throw new DataNotValid('No se ha encontrado el archivo.')
    const excelFile = file.buffer
    const workbook = XLSX.read(excelFile, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const excelData: object[] = XLSX.utils.sheet_to_json(worksheet, {
      raw: false,
      dateNF: 'yyyy-mm-dd',
      blankrows: false
    })
    req.body.parsedData = excelData
    next()
  } catch (error) {
    handleHTTP(res, (error as CustomError) ?? 'Error')
  }
}

export const formatExcelFileClasses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { parsedData } = req.body as { parsedData: object[] }
  try {
    const formattedData = parsedData.toSpliced(1, 3).map((item: any) => {
      if (typeof item !== 'object') return item
      const trimmedObject: Record<string, any> = {}
      for (const [key, value] of Object.entries(item)) {
        const normalizedKey = key
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\s+/g, '_')
          .toLowerCase()
          .trim()
        const normalizedValue = String(value).toLowerCase().trim()
        normalizedKey === 'reporte_de_aprendices' && (trimmedObject.tipo_documento_aprendiz = normalizedValue)
        normalizedKey === '__empty' && (trimmedObject.numero_documento_aprendiz = normalizedValue)
        normalizedKey === '__empty_1' && (trimmedObject.nombre_aprendiz = normalizedValue)
        normalizedKey === '__empty_2' && (trimmedObject.apellido_aprendiz = normalizedValue)
        normalizedKey === '__empty_3' && (trimmedObject.celular_aprendiz = normalizedValue)
        normalizedKey === '__empty_4' && (trimmedObject.email_aprendiz = normalizedValue)
        normalizedKey === '__empty_5' && (trimmedObject.estado_aprendiz = normalizedValue)
      }
      return trimmedObject
    })
    formattedData[0].numero_ficha = String(formattedData[0].nombre_aprendiz).split('-')[0].trim()
    formattedData[0].nombre_programa_formacion = String(formattedData[0].nombre_aprendiz).split('-')[1].trim()
    delete formattedData[0].tipo_documento_aprendiz
    delete formattedData[0].nombre_aprendiz
    req.body.parsedData = formattedData
    next()
  } catch (error) {
    handleHTTP(res, (error as CustomError) ?? 'Error')
  }
}
