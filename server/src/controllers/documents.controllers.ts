import { type Request, type Response } from 'express'
import { handleHTTP } from '../errors/errorsHandler.js'
import { type CustomError } from '../errors/customErrors.js'
import XLSX from 'xlsx'
import { connection } from '../config/db.js'
import { type RowDataPacket } from 'mysql2'

export const excelGeneratorClass = async (req: Request, res: Response): Promise<Response> => {
  const { numero_ficha } = req.query
  try {
    const payload = await getStudentsByNumberClass(numero_ficha)
    payload.forEach((student: any) => {
      for (const key in student) {
        const newKey = key.replaceAll('_', ' ').toUpperCase()
        student[newKey] = student[key]
        delete student[key]
      }
    })

    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(payload)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registros')

    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', 'attachment; filename=registros.xlsx')

    return res.send(buffer)
  } catch (error) {
    console.log(error)
    return handleHTTP(res, error as CustomError)
  }
}

export const excelGeneratorStudents = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const payload = await getStudents()
    payload.forEach((student: any) => {
      for (const key in student) {
        const newKey = key.replaceAll('_', ' ').toUpperCase()
        student[newKey] = student[key]
        delete student[key]
      }
    })

    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(payload)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estudiantes')

    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', 'attachment; filename=estudiantes.xlsx')

    return res.send(buffer)
  } catch (error) {
    console.log(error)
    return handleHTTP(res, error as CustomError)
  }
}

const getStudents = async (): Promise<any> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>('call sena_practicas.full_info_aprendiz()', [])
    const data = query[0]
    return data
  } catch (error) {
    throw new Error()
  }
}

const getStudentsByNumberClass = async (classNumber: any): Promise<any> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>('CALL aprendicesPorNumeroFicha(?)', [classNumber])
    const data = query[0]
    return data
  } catch (error) {
    throw new Error()
  }
}
