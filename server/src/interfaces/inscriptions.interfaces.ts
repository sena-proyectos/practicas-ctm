export interface inscriptionData {
  id_modalidad_inscripcion: number
  nombres_inscripcion: string
  apellidos_inscripcion: string
  tipo_documento_inscripcion: string
  numero_documento_inscripcion: string
  correo_electronico_inscripcion: string
  numero_celular_inscripcion: string
  etapa_formacion_actual_inscripcion: string
  nivel_formacion_actual_inscripcion: string
  id_ficha_inscripcion: number
  id_instructor_lider_inscripcion: number
  apoyo_sostenimiento_inscripcion: string
  id_empresa_inscripcion?: number
  nombre_completo_jefe_inmediato_inscripcion?: string
  cargo_jefe_inmediato_inscripcion?: string
  telefono_jefe_inmediato_inscripcion?: string
  correo_jefe_inmediato_inscripcion?: string
  asume_pago_arl_inscripcion?: string
  link_documentos_pdf_inscripcion: string
  observaciones_inscripcion: string
  fecha_creacion_inscripcion: Date
  id_usuario_responsable_inscripcion: number
}
