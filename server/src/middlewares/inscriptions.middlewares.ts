import multer from 'multer'
import * as XLSX from 'xlsx'
import { type Request, type NextFunction, type RequestHandler, type Response } from 'express'
import { type inscripcionDetailData, type inscriptionData } from '../interfaces/inscriptions.interfaces.js'
import { inscriptionDetailSchema, inscriptionSchema } from '../schemas/inscriptions.schemas.js'
import { type CustomError, DataNotValid, NumberIsNaN } from '../errors/customErrors.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { connection } from '../config/db.js'

/**
 * @description Middleware para verificar y validar los datos de inscripción.
 * @param req La solicitud HTTP con los datos de inscripción en el cuerpo (inscriptions).
 * @param res La respuesta HTTP.
 * @param next Función para pasar al siguiente middleware.
 */
export const checkInscriptionData: RequestHandler<{}, Response, inscriptionData> = (req: Request, res: Response, next: NextFunction): void => {
  const inscriptions = req.body as inscriptionData[]

  try {
    let inscriptionLength = 0
    for (const inscription of inscriptions) {
      const { nombre_inscripcion, apellido_inscripcion, tipo_documento_inscripcion, documento_inscripcion, email_inscripcion, inscripcion_celular, etapa_actual_inscripcion, modalidad_inscripcion, nombre_programa_inscripcion, nivel_formacion_inscripcion, numero_ficha_inscripcion, fecha_fin_lectiva_inscripcion, nombre_instructor_lider_inscripcion, email_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, nit_empresa_inscripcion, nombre_empresa_inscripcion, direccion_empresa_inscripcion, nombre_jefe_empresa_inscripcion, cargo_jefe_empresa_inscripcion, telefono_jefe_empresa_inscripcion, email_jefe_empresa_inscripcion, arl, link_documentos, observaciones, responsable_inscripcion } = inscription

      // * Parseo de datos de forma Number para ver si los datos que vienen string son numeros
      const numberParsed = Number(documento_inscripcion)
      const phoneStudentParsed = Number(inscripcion_celular)
      const fichaNumber = Number(numero_ficha_inscripcion)
      const nitEmpresaNumber = Number(nit_empresa_inscripcion)
      const phoneBossParsed = Number(telefono_jefe_empresa_inscripcion)
      if (isNaN(numberParsed)) throw new NumberIsNaN('El número de documento no es un número.')
      if (isNaN(phoneStudentParsed)) throw new NumberIsNaN('El número de celular del estudiante no es un número.')
      if (isNaN(fichaNumber)) throw new NumberIsNaN('El número de la ficha no es un número.')
      if (isNaN(nitEmpresaNumber)) throw new NumberIsNaN('El nit de la empresa no es un número.')
      if (isNaN(phoneBossParsed)) throw new NumberIsNaN('El número de celular del jefe inmediato no es un número.')

      const { error } = inscriptionSchema.validate({
        nombre_inscripcion, apellido_inscripcion, tipo_documento_inscripcion, documento_inscripcion: numberParsed, email_inscripcion, inscripcion_celular: phoneStudentParsed, etapa_actual_inscripcion, modalidad_inscripcion, nombre_programa_inscripcion, nivel_formacion_inscripcion, numero_ficha_inscripcion: fichaNumber, fecha_fin_lectiva_inscripcion, nombre_instructor_lider_inscripcion, email_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, nit_empresa_inscripcion: nitEmpresaNumber, nombre_empresa_inscripcion, direccion_empresa_inscripcion, nombre_jefe_empresa_inscripcion, cargo_jefe_empresa_inscripcion, telefono_jefe_empresa_inscripcion: phoneBossParsed, email_jefe_empresa_inscripcion, arl, link_documentos, observaciones, responsable_inscripcion
      })
      if (error !== undefined) throw new DataNotValid(`Los datos ingresados del id ${inscriptionLength} no son válidos, verifícalos.`)
      inscriptionLength += 1
    }
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

/**
 * @description Middleware para verificar y validar los datos de detalle de inscripción a actualizar.
 * @param req La solicitud HTTP con los parámetros de ruta y datos de actualización en el cuerpo.
 * @param res La respuesta HTTP.
 * @param next Función para pasar al siguiente middleware.
 */
export const checkInscriptionDetailData: RequestHandler<{ }, Response, inscripcionDetailData> = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params
  const { estado_aval, observaciones, responsable_aval } = req.body
  try {
    const { error } = inscriptionDetailSchema.validate({ id, responsable_aval, estado_aval, observaciones })
    if (error !== undefined) throw new DataNotValid('Los datos ingresados no son válidos, verifícalos.')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

export const configureMulterExcel = (): RequestHandler => {
  const storage = multer.memoryStorage()
  const upload = multer({ storage })

  return upload.single('excelFile')
}

export const readExcelFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { file } = req
  try {
    if (file === undefined) throw new DataNotValid('No se ha encontrado el archivo.')
    const excelFile = file.buffer
    const workbook = XLSX.read(excelFile, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const excelData = XLSX.utils.sheet_to_json(worksheet, {
      raw: false,
      dateNF: 'dd-mm-yyyy'
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataToSend = await Promise.all(excelData.map(async (item: any, i: number) => {
      const modalidad = item['Seleccione la Alternativa de Etapa Productiva que desea registrar']
      // console.log('test1')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [result]: any[] = await connection.query('SELECT id_modalidad FROM modalidades where nombre_modalidad like ?', [`%${modalidad as string}%`])
      console.log(result, i)
      // console.log('test2', result)
      // const fechaTerminacionLectiva = item['Fecha de terminación de la etapa lectiva']
      // console.log(fechaTerminacionLectiva)
      // const parts = fechaTerminacionLectiva.split('/')
      // console.log(parts)

      // if (parts.length !== 3) throw new DataNotValid('La fecha de terminación de la etapa lectiva no es válida, verifícalo.')

      // const dateParsed = new Date(parts[2], parts[1] - 1, parts[0]).toISOString().split('T')[0]

      if (item['Seleccione la Etapa de Formación en la que se encuentra'] === null) return

      return {
        id: i,
        nombre_inscripcion: item['Nombre Completo'],
        apellido_inscripcion: item['Apellidos completos'],
        tipo_documento_inscripcion: item['Tipo de Documento de Identidad'],
        documento_inscripcion: item['Numero de documento del aprendiz'],
        email_inscripcion: item['Correo electrónico del aprendiz'],
        inscripcion_celular: item['Número de celular del aprendiz'],
        etapa_actual_inscripcion: item['Seleccione la Etapa de Formación en la que se encuentra'],
        modalidad_inscripcion: result[0]?.id_modalidad,
        nombre_programa_inscripcion: item['Nombre del Programa'],
        nivel_formacion_inscripcion: item['Nivel de formación'],
        numero_ficha_inscripcion: item['Número de ficha'],
        fecha_fin_lectiva_inscripcion: item['Fecha de terminación de la etapa lectiva'],
        nombre_instructor_lider_inscripcion: item['Nombre completo del instructor líder'],
        email_instructor_lider_inscripcion: item['Correo del instructor líder'],
        apoyo_sostenimiento_inscripcion: item['Recibe alguno de estos apoyos de sostenimiento'],
        nit_empresa_inscripcion: item['NIT de la Empresa'] ?? null,
        nombre_empresa_inscripcion: item['Razón Social (Nombre de la Empresa)'] ?? null,
        direccion_empresa_inscripcion: item['Direcciòn de la empresa'] ?? null,
        nombre_jefe_empresa_inscripcion: item['Nombre Completo del Contacto en la Empresa (Jefe inmediato)'] ?? null,
        cargo_jefe_empresa_inscripcion: item['Cargo del Contacto en la Empresa'] ?? null,
        telefono_jefe_empresa_inscripcion: item['Teléfono de la Empresa o Jefe inmediato'] ?? null,
        email_jefe_empresa_inscripcion: item['Correo Electrónico Contacto en la Empresa'] ?? null,
        municipio_empresa: item['Municipio donde se encuentra la Empresa'] ?? null,
        arl: item['Si su modalidad de práctica es Pasantía o Monitoria, quién asume el pago de la ARL?'] ?? null,
        link_documentos: item['Anexar documentos. Todos los documentos requeridos para el registro deben estar unidos en un solo PDF'],
        observaciones: item['Observaciones - Comentarios'] ?? null
      }
    }))
    console.log(dataToSend)
    req.body.excelData = dataToSend
    next()
  } catch (error) {
    console.log(error)
    handleHTTP(res, error as CustomError)
  }
}
