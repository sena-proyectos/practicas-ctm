import { type Request, type Response, type RequestHandler, type NextFunction } from 'express'
import { type infoStudents } from '../interfaces/students.interfaces.js'
import { type CustomError, DataNotValid, NumberIsNaN } from '../errors/customErrors.js'
import { studentSchema } from '../schemas/students.schemas.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import * as XLSX from 'xlsx'

export const checkRegisterStudentData: RequestHandler<{}, Response, infoStudents[]> = (req: Request, res: Response, next: NextFunction) => {
  const students = req.body as infoStudents[]
  try {
    let studentLength = 0
    for (const student of students) {
      const { nombre_aprendiz, apellido_aprendiz, tipo_documento_aprendiz, numero_documento_aprendiz, email_aprendiz, celular_aprendiz, fecha_fin_practica_aprendiz, estado_aprendiz, id_empresa, id_modalidad, id_jefe, id_arl } = student

      const idNumberParsed = Number(numero_documento_aprendiz)
      const phoneParsed = Number(celular_aprendiz)
      const idEmpresaNumber = Number(id_empresa)
      const idModalidadNumber = Number(id_modalidad)
      const idJefeNumber = Number(id_jefe)
      const idArlNumber = Number(id_arl)

      if (isNaN(idNumberParsed)) throw new NumberIsNaN(`El número de identificación del estudiante ${studentLength} no es un número.`)
      if (isNaN(phoneParsed)) throw new NumberIsNaN(`El número celular del estudiante ${studentLength} no es un número.`)
      if (isNaN(idEmpresaNumber)) throw new NumberIsNaN('El id de la modalidad no es un número.')
      if (isNaN(idModalidadNumber)) throw new NumberIsNaN('El id de la modalidad no es un número.')
      if (isNaN(idJefeNumber)) throw new NumberIsNaN('El id de la modalidad no es un número.')
      if (isNaN(idArlNumber)) throw new NumberIsNaN('El id de la modalidad no es un número.')

      const { error } = studentSchema.validate({ nombre_aprendiz, apellido_aprendiz, tipo_documento_aprendiz, numero_documento_aprendiz, email_aprendiz, celular_aprendiz, fecha_fin_practica_aprendiz, estado_aprendiz, id_empresa, id_modalidad, id_jefe, id_arl })

      if (error !== undefined) throw new DataNotValid(`Los datos ingresados del id ${studentLength} no son válidos, verifícalos.`)
      studentLength += 1
    }
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

export const readExcelFileStudents = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
  const { file } = req
  try {
    if (file === undefined) throw new DataNotValid('No se ha encontrado el archivo.')
    const excelFile = file.buffer
    const workbook = XLSX.read(excelFile, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const excelData: object[] = XLSX.utils.sheet_to_json(worksheet, {
      raw: false,
      dateNF: 'dd-mm-yyyy',
      blankrows: false
    })
    const parsedSpaces = excelData.map((item: any) => {
      if (typeof item !== 'object') return item
      const trimmedObject: Record<string, any> = {}

      for (const [key, value] of Object.entries(item)) {
        typeof value === 'string' ? trimmedObject[key] = value.trim().toLocaleLowerCase() : trimmedObject[key] = value
        if (typeof value === 'string' && key === 'Tipo Documento') {
          trimmedObject[key] = value.replace(/\./g, '').toLocaleLowerCase().trim()
        }
        if (typeof value === 'string' && (key === 'Fecha inicio contrato' || key === 'Fecha fin contrato')) {
          trimmedObject[key] = value.split('/').reverse().join('-')
        }
        if (typeof value === 'string' && key === 'Fecha creación') {
          delete trimmedObject['Fecha creación']
          continue
        }
      }
      return trimmedObject
    })
    return res.status(200).json({ parsedSpaces })
  } catch (error) {
    return handleHTTP(res, error as CustomError ?? 'Error')
  }
}
