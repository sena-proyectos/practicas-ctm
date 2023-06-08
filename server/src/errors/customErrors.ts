export class customError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'CustomError'
  }
}

export class dbNotExists extends customError {
  constructor () {
    super('El dato que has ingresado no existe en la base de datos.')
    this.name = 'DBNotExists'
  }
}

export class dataNotValid extends customError {
  constructor () {
    super('El dato que has ingresado no es valido.')
    this.name = 'DataNotValid'
  }
}
