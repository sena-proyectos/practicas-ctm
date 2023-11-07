import { type Request } from 'express'
import { type DbError } from '../errors/customErrors'

export interface infoStudents {
  nombre_aprendiz: string
  apellido_aprendiz: string
  tipo_documento_aprendiz: string
  numero_documento_aprendiz: number
  email_aprendiz?: string
  celular_aprendiz?: string
  fecha_fin_practica_aprendiz: Date
  estado_aprendiz: string
  id_empresa?: number
  id_modalidad?: number
  id_jefe?: number
  id_arl?: number
  id_contrato?: number
}

export type TEmpresaExcelRequest = Request<Array<{ nit_empresa: string, nombre_empresa: string, direccion: string }>>

export type TFichaExcelRequest = Request<Array<{ numero_ficha: string, nombre_programa_formacion: string, fecha_inicio_lectiva: string, fecha_inicio_practica: string, codigo_centro: string, id_nivel_formacion: number }>>

export type TContratoExcelRequest = Request<Array<{ fecha_inicio_contrato: string, fecha_fin_contrato: string, estado_contrato: string }>>

export type TStudentExcelRequest = Request<Array<{ tipo_documento: string, numero_documento: string, apellidos: string, nombres: string, estado_aprendiz: string }>>

export type excelPayload = number[] | DbError

export interface studentContrato extends infoStudents {
  id_ficha: number
}
