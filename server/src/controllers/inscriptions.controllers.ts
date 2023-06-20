import { type RequestHandler, type Request, type Response } from 'express'
import { type inscriptionData } from '../interfaces/inscriptions.interfaces.js'
import { connection } from '../config/db.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { type CustomError } from '../errors/customErrors.js'

export const getInscriptions = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [inscriptions] = await connection.query('SELECT * FROM inscripciones')
    return res.status(httpStatus.OK).json({ data: inscriptions })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getInscriptionById: RequestHandler<{ id: string }, Response, inscriptionData> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id } = req.params
  const idNumber = Number(id)
  try {
    const [inscription] = await connection.query('SELECT * FROM inscripciones WHERE id_inscripcion = ?', [idNumber])
    return res.status(httpStatus.OK).json({ data: inscription })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const createInscription = async (req: Request<inscriptionData>, res: Response): Promise<Response> => {
  const {
    nombres_aprendiz_inscripcion,
    apellidos_aprendiz_inscripcion,
    tipo_documento_aprendiz_inscripcion,
    numero_documento_aprendiz_inscripcion,
    correo_electronico_aprendiz_inscripcion,
    numero_telefono_aprendiz_inscripcion,
    numero_ficha_aprendiz_inscripcion,
    programa_formacion_aprendiz_inscripcion,
    tipo_modalidad_aprendiz_inscripcion,
    inicio_etapa_practica_aprendiz_inscripcion,
    fin_etapa_practica_aprendiz_inscripcion
  } = req.body
  try {
    await connection.query(
      'INSERT INTO inscripciones (nombres_aprendiz_inscripcion, apellidos_aprendiz_inscripcion, tipo_documento_aprendiz_inscripcion, numero_documento_aprendiz_inscripcion, correo_electronico_aprendiz_inscripcion, numero_telefono_aprendiz_inscripcion, numero_ficha_aprendiz_inscripcion, programa_formacion_aprendiz_inscripcion, tipo_modalidad_aprendiz_inscripcion, inicio_etapa_practica_aprendiz_inscripcion, fin_etapa_practica_aprendiz_inscripcion, fecha_creacion_aprendiz_inscripcion) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())',
      [nombres_aprendiz_inscripcion, apellidos_aprendiz_inscripcion, tipo_documento_aprendiz_inscripcion, numero_documento_aprendiz_inscripcion, correo_electronico_aprendiz_inscripcion, numero_telefono_aprendiz_inscripcion, numero_ficha_aprendiz_inscripcion, programa_formacion_aprendiz_inscripcion, tipo_modalidad_aprendiz_inscripcion,inicio_etapa_practica_aprendiz_inscripcion, fin_etapa_practica_aprendiz_inscripcion]
    )
    return res.status(httpStatus.OK).json({ message: 'Inscripción creada con éxito.' })
  } catch (error) {
    console.log(error);
    return handleHTTP(res, error as CustomError)
  }
}
