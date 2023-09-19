import multer from 'multer'
import * as XLSX from 'xlsx'
import { type Request, type NextFunction, type RequestHandler, type Response } from 'express'
import { type inscripcionDetailData, type inscriptionData } from '../interfaces/inscriptions.interfaces.js'
import { inscriptionDetailSchema, inscriptionSchema } from '../schemas/inscriptions.schemas.js'
import { type CustomError, DataNotValid } from '../errors/customErrors.js'
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

      const { error } = inscriptionSchema.validate({
        nombre_inscripcion, apellido_inscripcion, tipo_documento_inscripcion, documento_inscripcion, email_inscripcion, inscripcion_celular, etapa_actual_inscripcion, modalidad_inscripcion, nombre_programa_inscripcion, nivel_formacion_inscripcion, numero_ficha_inscripcion, fecha_fin_lectiva_inscripcion, nombre_instructor_lider_inscripcion, email_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, nit_empresa_inscripcion, nombre_empresa_inscripcion, direccion_empresa_inscripcion, nombre_jefe_empresa_inscripcion, cargo_jefe_empresa_inscripcion, telefono_jefe_empresa_inscripcion, email_jefe_empresa_inscripcion, arl, link_documentos, observaciones, responsable_inscripcion
      })
      console.log(error)
      if (error !== undefined) throw new DataNotValid(`Los datos ingresados del id ${inscriptionLength} no son válidos, verifícalos.`)
      inscriptionLength += 1
    }
    console.log('Bueno')
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
export const checkInscriptionDetailData: RequestHandler<{}, Response, inscripcionDetailData> = (req: Request, res: Response, next: NextFunction): void => {
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

function extractLinksFromExcel (worksheet: any, columnLetter: string): any[] {
  const linksArray = []
  for (const cell in worksheet) {
    // eslint-disable-next-line no-prototype-builtins
    if (worksheet.hasOwnProperty(cell) && cell !== '!ref') {
      const cellValue = worksheet[cell]
      const columnIndex = XLSX.utils.decode_cell(cell).c
      if (columnIndex === columnLetter.charCodeAt(0) - 'A'.charCodeAt(0)) {
        // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
        if (cellValue && cellValue?.l && cellValue?.l?.Target) {
          linksArray.push(cellValue.l.Target)
        }
      }
    }
  }

  return linksArray
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
      dateNF: 'dd-mm-yyyy',
      blankrows: false
    })
    const columnLetter = 'Z'
    const linksArray = extractLinksFromExcel(worksheet, columnLetter)

    const dataToSend = await Promise.all(excelData.map(async (item: any) => {
      if (item['Seleccione la Alternativa de Etapa Productiva que desea registrar'] === undefined || item['Seleccione la Alternativa de Etapa Productiva que desea registrar'].length === 0) return null
      const modalidad = item['Seleccione la Alternativa de Etapa Productiva que desea registrar']
      const [result]: any[] = await connection.query('SELECT id_modalidad FROM modalidades where nombre_modalidad like ?', [`%${modalidad as string}%`])

      let fecha_lectiva_terminacion = item['Fecha de terminación de la etapa lectiva']

      if (fecha_lectiva_terminacion) {
        const partesFecha = fecha_lectiva_terminacion.split('/')

        const mes: string = partesFecha[0].padStart(2, '0')
        const dia: string = partesFecha[1].padStart(2, '0')
        const año: string = partesFecha[2].padStart(4, '20')

        const fechaFormateada = `${año}-${mes}-${dia}`

        fecha_lectiva_terminacion = fechaFormateada
      }

      return {
        nombre_inscripcion: item['Nombre Completo'] ?? null,
        apellido_inscripcion: item['Apellidos completos'] ?? null,
        tipo_documento_inscripcion: item['Tipo de Documento de Identidad'] ?? null,
        documento_inscripcion: item['Numero de documento del aprendiz'] ?? null,
        email_inscripcion: item['Correo electrónico del aprendiz'] ?? null,
        inscripcion_celular: item['Número de celular del aprendiz'] ?? null,
        etapa_actual_inscripcion: item['Seleccione la Etapa de Formación en la que se encuentra '] ?? null,
        modalidad_inscripcion: result[0]?.id_modalidad ?? null,
        nombre_programa_inscripcion: item['Nombre del Programa'] ?? null,
        nivel_formacion_inscripcion: item['Nivel de formación'] ?? null,
        numero_ficha_inscripcion: item['Número de ficha'] ?? null,
        fecha_fin_lectiva_inscripcion: fecha_lectiva_terminacion ?? null,
        nombre_instructor_lider_inscripcion: item['Nombre completo del instructor líder'] ?? null,
        email_instructor_lider_inscripcion: item['Correo del instructor líder'] ?? null,
        apoyo_sostenimiento_inscripcion: item['Recibe alguno de estos apoyos de sostenimiento'] ?? null,
        nit_empresa_inscripcion: item['NIT de la Empresa'] ?? null,
        nombre_empresa_inscripcion: item['Razón Social (Nombre de la Empresa)'] ?? null,
        direccion_empresa_inscripcion: item['Direcciòn de la empresa '] ?? null,
        nombre_jefe_empresa_inscripcion: item['Nombre Completo del Contacto en la Empresa (Jefe inmediato)'] ?? null,
        cargo_jefe_empresa_inscripcion: item['Cargo del Contacto en la Empresa '] ?? null,
        telefono_jefe_empresa_inscripcion: item['Teléfono de la Empresa o Jefe inmediato'] ?? null,
        email_jefe_empresa_inscripcion: item['Correo Electrónico Contacto en la Empresa'] ?? null,
        arl: item['Si su modalidad de práctica es Pasantía o Monitoria, quién asume el pago de la ARL?'] ?? null,
        observaciones: item['Observaciones - Comentarios'] ?? null
      }
    }))

    const filteredArray = dataToSend.filter((item) => item !== null).map((item, i) => {
      const originalLink = linksArray[i]
      const regex = /(?:\/open\?id=|\/file\/d\/|id=)([^/]+)/

      const match = originalLink.match(regex)

      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      if (match && match[1]) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const linkDrive = `https://drive.google.com/file/d/${match[1]}/preview`
        return {
          ...item,
          link_documentos: linkDrive
        }
      }
      return {
        ...item,
        link_documentos: originalLink
      }
    })

    req.body.excelData = filteredArray
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
