export interface idUser {
  id: number
}

export interface userForm extends idUser {
  nombre: string
  apellido: string
  tipo_documento: string
  num_documento: number
  correo_electronico: string
  num_celular: number
  id_rol: number
  contrasena: string
}

export interface idNumber {
  idNumber: number
}

export interface LoginData extends idNumber {
  password: string
}

export interface passwordCompare {
  password: string
  dbPassword: string
}
