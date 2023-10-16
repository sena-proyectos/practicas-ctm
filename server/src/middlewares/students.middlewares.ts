import { type Request, type Response, type RequestHandler, type NextFunction } from 'express'
import { type infoStudents } from '../interfaces/students.interfaces.js'
import { type CustomError, DataNotValid, NumberIsNaN } from '../errors/customErrors.js'
import { studentSchema } from '../schemas/students.schemas.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { getModalitiesByName } from '../controllers/modalities.controllers.js'
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

export const readExcelFileStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
    const parsedSpaces = excelData.map((item: any) => {
      if (typeof item !== 'object') return item
      const trimmedObject: Record<string, any> = {}

      for (const [key, value] of Object.entries(item)) {
        const normalizedKey = key
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\s+/g, '_')
        trimmedObject[normalizedKey] = value
        typeof value === 'string' ? trimmedObject[normalizedKey] = value.trim().toLocaleLowerCase() : trimmedObject[normalizedKey] = value
        if (typeof value === 'string' && normalizedKey === 'tipo_documento') {
          trimmedObject[normalizedKey] = value.replace(/\./g, '').toLocaleLowerCase().trim()
        }
        if (typeof value === 'string' && (normalizedKey === 'fecha_inicio_contrato' || normalizedKey === 'fecha_fin_contrato' || normalizedKey === 'fecha_lectiva' || normalizedKey === 'fecha_productiva')) {
          trimmedObject[normalizedKey] = value.split('/').reverse().join('-')
        }

        if (typeof value === 'string') {
          delete trimmedObject.fecha_creacion
          delete trimmedObject.regional
          delete trimmedObject.centro
          delete trimmedObject.ciudad
          continue
        }
      }
      return trimmedObject
    })
    req.body.arrExcel = parsedSpaces
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError ?? 'Error')
  }
}

interface IModalities {
  [key: string]: string
  Tecnologo: string
  Tecnico: string
  Auxiliar: string
}

const modalities: IModalities = {
  Tecnologo: 'Tecnología',
  Tecnico: 'Técnico',
  Auxiliar: 'Auxiliar'
}

export const classifyExcel = (req: Request, res: Response, next: NextFunction): void => {
  const { arrExcel } = req.body
  try {
    const empresaData = arrExcel.map((item: any) => ({
      nit_empresa: item.nit,
      nombre_empresa: item.razon_social,
      direccion: item.direccion
    }))
    const fichaData = arrExcel.map(async (item: any) => {
      const splitModalidad: string = item.especialidad.split(' ')[0].toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
      const modalidad: string = splitModalidad.charAt(0).toUpperCase() + splitModalidad.slice(1)
      const modalidadData = modalities[modalidad]
      const idModalidad = await getModalitiesByName(modalidadData)
      return {
        numero_ficha: item.ficha,
        nombre_programa_formacion: item.especialidad,
        fecha_inicio_lectiva: item.fecha_lectiva,
        fecha_inicio_practica: item.fecha_productiva,
        codigo_centro: item.codigo_centro,
        id_nivel_formacion: idModalidad
      }
    })
    const contratoData = arrExcel.map((item: any) => ({
      fecha_inicio_contrato: item.fecha_inicio_contrato,
      fecha_fin_contrato: item.fecha_fin_contrato,
      estado_contrato: item.estado_contrato
    }))
    const studentData = arrExcel.map((item: any) => ({
      tipo_documento: item.tipo_documento,
      numero_documento: item.numero_documento,
      apellidos: item.apellidos,
      nombres: item.nombres,
      fecha_fin_practica_aprendiz: item.fecha_fin_contrato,
      estado_aprendiz: item.estado_aprendiz
    }))

    req.body = {
      empresaData,
      fichaData,
      contratoData,
      studentData
    }
    next()
  } catch (error) {
    console.error(error)
    handleHTTP(res, error as CustomError)
  }
}
