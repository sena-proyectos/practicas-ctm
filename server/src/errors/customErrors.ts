import { httpStatus } from '../models/httpStatus.enums.js'

export class CustomError extends Error {
  statusCode: number
  errorCode: string
  header: string

  constructor (message: string, statusCode = 500, errorCode = 'INTERNAL_SERVER_ERROR') {
    super(message)
    this.header = 'Custom_error'
    this.statusCode = statusCode
    this.errorCode = errorCode
  }
}

export class DbError extends CustomError {
  constructor (message: string) {
    super(message)
    this.header = 'DB_ERROR'
    this.statusCode = httpStatus.INTERNAL_SERVER_ERROR
    this.errorCode = 'INTERNAL_SERVER_ERROR'
  }
}

export class DataNotValid extends CustomError {
  constructor () {
    super('El dato que has ingresado no es valido.')
    this.name = 'DataNotValid'
  }
}
