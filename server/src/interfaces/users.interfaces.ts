export interface id {
  id: number
}

export interface userForm {
  nombre: string
  apellido: string
  tipo_documento: string
  num_documento: string
  correo_electronico: string
  num_celular: string
  id_rol: number
  contrasena: string
}

export interface idNumber {
  num_documento: string
}

export interface LoginData extends idNumber {
  contrasena: string
}

export interface passwordCompare {
  contrasena: string
  dbPassword: string
}
