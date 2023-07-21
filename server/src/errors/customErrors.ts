import { errorCodes } from '../models/errorCodes.enums.js'
import { httpStatus } from '../models/httpStatus.enums.js'

export class CustomError extends Error {
  statusCode: number
  errorCode: string
  header: string

  constructor (message: string, statusCode = httpStatus.INTERNAL_SERVER_ERROR, errorCode = errorCodes.INTERNAL_SERVER_ERROR) {
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
    this.errorCode = errorCodes.INTERNAL_SERVER_ERROR
  }
}

export class DbErrorNotFound extends CustomError {
  errorCode: string
  constructor (message: string, errorCode = errorCodes.INTERNAL_SERVER_ERROR) {
    super(message)
    this.header = 'DB_ERROR'
    this.statusCode = httpStatus.NOT_FOUND
    this.errorCode = errorCode
  }
}

export class DataNotValid extends CustomError {
  constructor (message: string, errorCode = errorCodes.INTERNAL_SERVER_ERROR) {
    super(message)
    this.header = 'DATA_ERROR'
    this.statusCode = httpStatus.INTERNAL_SERVER_ERROR
    this.errorCode = errorCode
  }
}

export class UserExists extends CustomError {
  constructor (message: string) {
    super(message)
    this.header = 'DATA_EXIST'
    this.statusCode = httpStatus.INTERNAL_SERVER_ERROR
    this.errorCode = errorCodes.ERROR_CREATE_USER
  }
}

export class IdIsNaN extends CustomError {
  constructor (message: string) {
    super(message)
    this.header = 'ID_ERROR'
    this.statusCode = httpStatus.BAD_REQUEST
    this.errorCode = errorCodes.ERROR_ID_NAN
  }
}

export class NumberIsNaN extends CustomError {
  constructor (message: string) {
    super(message)
    this.header = 'NUMBER_ERROR'
    this.statusCode = httpStatus.BAD_REQUEST
    this.errorCode = errorCodes.ERROR_NUMBER_NAN
  }
}
