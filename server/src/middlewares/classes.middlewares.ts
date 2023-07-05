import { type NextFunction, type Request, type Response } from 'express'
import { type CustomError, DataNotValid, NumberIsNaN } from '../errors/customErrors.js'
import { classSchema } from '../schemas/classes.schemas.js'
import { handleHTTP } from '../errors/errorsHandler.js'

export const checkClassData = (req: Request, res: Response, next: NextFunction): void => {
  const { numero_ficha, nombre_programa_formación, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_inicio_practica, fecha_fin_practica, nivel_programa_formación, jornada_ficha, id_instructor_lider_formacion, id_instructor_practicas_formacion } = req.query
  const idTeacherLeader = parseInt(id_instructor_lider_formacion as string, 10)
  const idTeacherPractical = parseInt(id_instructor_practicas_formacion as string, 10)

  const classNumber = Number(numero_ficha)
  try {
    if (isNaN(idTeacherLeader)) throw new NumberIsNaN('el id del instructor líder no es un número.')
    if (isNaN(idTeacherPractical)) throw new NumberIsNaN('el id del instructor de prácticas no es un número.')
    if (isNaN(classNumber)) throw new NumberIsNaN('el numero de la ficha no es un número.')

    const { error } = classSchema.validate({ numero_ficha, nombre_programa_formación, fecha_inicio_lectiva, fecha_fin_lectiva, fecha_inicio_practica, fecha_fin_practica, nivel_programa_formación, jornada_ficha, id_instructor_lider_formacion, id_instructor_practicas_formacion })
    if (error !== undefined) throw new DataNotValid('Los datos ingresados para la ficha no son válidos')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

export const checkClassNumber = (req: Request, res: Response, next: NextFunction): void => {
  const { numero_ficha } = req.body
  const classNumber = Number(numero_ficha)
  try {
    if (isNaN(classNumber)) throw new NumberIsNaN('El número de ficha ingresado no es número')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
