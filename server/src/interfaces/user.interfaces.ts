export interface id {
  id: number
}

export interface userForm {
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
  num_documento: number
}

export interface LoginData extends idNumber {
  contrasena: string
}

export interface passwordCompare {
  contrasena: string
  dbPassword: string
}
