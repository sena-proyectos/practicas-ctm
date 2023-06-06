import { type Request, type Response } from 'express'
import { type inscription } from '../models/inscriptions.interfaces.js'
import { connection } from '../config/db.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { handleHTTP } from '../utils/errorsHandler.js'
import { type id } from '../models/user.interfaces.js'

export const getInscriptions = async (_req: Request<inscription>, res: Response): Promise<Response> => {
  try {
    const [inscriptions] = await connection.query('SELECT * FROM inscripciones')
    return res.status(httpStatus.OK).json({ data: inscriptions })
  } catch (error) {
    return handleHTTP(res, 'ERROR_GET_PRACTICAL_STAGES')
  }
}

export const getInscriptionById = async ({ params }: Request<id>, res: Response): Promise<Response> => {
  const { id } = params
  try {
    const [inscription] = await connection.query('SELECT * FROM inscripciones WHERE id_inscripcion = ?', [id])
    return res.status(httpStatus.OK).json({ data: inscription })
  } catch (error) {
    return handleHTTP(res, 'ERROR_GET_PRACTICAL_STAGE')
  }
}

export const createInscription = async ({ body }: Request<inscription>, res: Response): Promise<Response> => {
  const { nombres_aprendiz_inscripcion, apellidos_aprendiz_inscripcion, tipo_documento_aprendiz_inscripcion, numero_documento_aprendiz_inscripcion, correo_electronico_aprendiz_inscripcion, numero_telefono_aprendiz_inscripcion, numero_ficha_aprendiz_inscripcion, programa_formacion_aprendiz_inscripcion, tipo_modalidad_aprendiz_inscripcion,inicio_etapa_practica_aprendiz_inscripcion, fin_etapa_practica_aprendiz_inscripcion } = body
  try {
    await connection.query(
      'INSERT INTO inscripciones (nombres_aprendiz_inscripcion, apellidos_aprendiz_inscripcion, tipo_documento_aprendiz_inscripcion, numero_documento_aprendiz_inscripcion, correo_electronico_aprendiz_inscripcion, numero_telefono_aprendiz_inscripcion, numero_ficha_aprendiz_inscripcion, programa_formacion_aprendiz_inscripcion, tipo_modalidad_aprendiz_inscripcion, inicio_etapa_practica_aprendiz_inscripcion, fin_etapa_practica_aprendiz_inscripcion, fecha_creacion_aprendiz_inscripcion) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())',
      [nombres_aprendiz_inscripcion, apellidos_aprendiz_inscripcion, tipo_documento_aprendiz_inscripcion, numero_documento_aprendiz_inscripcion, correo_electronico_aprendiz_inscripcion, numero_telefono_aprendiz_inscripcion, numero_ficha_aprendiz_inscripcion, programa_formacion_aprendiz_inscripcion, tipo_modalidad_aprendiz_inscripcion,inicio_etapa_practica_aprendiz_inscripcion, fin_etapa_practica_aprendiz_inscripcion]
    )
    return res.status(httpStatus.OK).json({ data: 'Done' })
  } catch (error) {
    return handleHTTP(res, error)
  }
}
