import { type Request, type Response, type RequestHandler, type NextFunction } from 'express'
import { type infoStudents } from '../interfaces/students.interfaces.js'
import { type CustomError, DataNotValid, NumberIsNaN } from '../errors/customErrors.js'
import { studentSchema } from '../schemas/students.schemas.js'
import { handleHTTP } from '../errors/errorsHandler.js'

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
