import schedule, { Job, JobCallback } from 'node-schedule'
import { DbError } from '../errors/customErrors.js'
import { connection } from '../config/db.js'
import { type RowDataPacket } from 'mysql2'
import { sendEmailAnyBody, sendEmailAnyBodyNotfile } from '../controllers/email.controllers.js'
import XLSX from 'xlsx'
import { type IStudentData } from '../interfaces/scheduler.interfaces.js'

/**
 * Especifíca las reglas de ejecución del programador semanal
 * @property {number} rule.dayOfWeek - Que dia de la semana se va a ejecutar siendo 0 = Domingo y 6 = Sabado
 * @property {number} rule.hour - Que hora se va a ejecutar
 * @property {number} rule.minute - Que minuto se va a ejecutar
 */
const rule = new schedule.RecurrenceRule()
rule.dayOfWeek = 1
rule.hour = 10
rule.minute = 0

/**
 * Se encarga de generar el informe de aprendices sin practicas, enviar los correos a los aprendices y generar el excel para retornar los dos correos principales
 * @param {schedule.RecurrenceRule} rule
 * @param {JobCallback}
 * @callback
 * @returns {Job}
 * @async
 */
export const schedulerTasks = schedule.scheduleJob(rule, async () => {
  try {
    const data = await querySchedule()
    await sendEmailsToStudents(data)
    const file = generateExcel(data)

    const table = `
      <table border="1">
        <thead>
          <tr>
            <th>Nombre Aprendiz</th>
            <th>Apellido Aprendiz</th>
            <th>Tipo Documento</th>
            <th>Número Documento</th>
            <th>Email Aprendiz</th>
            <th>Celular Aprendiz</th>
            <th>Estado Aprendiz</th>
            <th>Número de Ficha</th>
            <th>Programa de Formación</th>
          </tr>
        </thead>
        <tbody>
          ${data.map((item: IStudentData) => `
            <tr>
              <td>${item.nombre_aprendiz}</td>
              <td>${item.apellido_aprendiz}</td>
              <td>${item.tipo_documento_aprendiz}</td>
              <td>${item.numero_documento_aprendiz}</td>
              <td>${item.email_aprendiz}</td>
              <td>${item.celular_aprendiz}</td>
              <td>${item.estado_aprendiz}</td>
              <td>${item.numero_ficha}</td>
              <td>${item.nombre_programa_formacion}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    `

    const body = `
      <h1>Aprendices sin prácticas registradas:</h1>
      ${table}
    `

    sendEmailAnyBody({ body, subject: 'Informe bisemanal aprendices sin practicas en Practicas CTM', to: 'inf.practicasctm@outlook.com', file })
      .then(() => {
        console.log('Correo enviado')
      })
      .catch((err) => {
        console.error(err)
      })
  } catch (error) {
    console.error('Ha ocurrido un error al ejecutar el scheduler')
  }
})

/**
 * Generador de excel del archivo enviado al correo junto con un parseo de columans
 * @param {Object[]} payload
 * @returns {Buffer} - Archivo excel
 * @throws {Error} Error mandado por XLSX
 */
const generateExcel = (payload: object[]): Buffer => {
  try {
    const data = payload.map((student: any) => {
      return Object.entries(student).reduce(
        (obj, [key, value]) => ({
          ...obj,
          [key.replaceAll('_', ' ').toUpperCase()]: value
        }),
        {}
      )
    })
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estudiantes sin practicas')
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })

    return buffer
  } catch (error) {
    throw new Error(error as string)
  }
}

/**
 * Se encarga de enviar los correos a todos los aprendices que se encuentran actualmente en un estado diferente 'Prácticas' o su fecha de fin de practicas no es especifícado
 * @param {IStudentData[]} payload
 * @returns {Promise<void>}
 * @async
 */
const sendEmailsToStudents = async (payload: IStudentData[]): Promise<void> => {
  try {
    for (let i = 0; i < payload.length; i++) {
      const item = payload[i]
      const body = `Cordial saludo, <br/> aprendiz ${item.nombre_aprendiz} ${item.apellido_aprendiz} reportado sin prácticas actualmente, contáctese con <a href="mailto:practicasctm@sena.edu.co">practicasctm@sena.edu.co</a> para reportar su estado.`
      await sendEmailAnyBodyNotfile({ body, subject: 'Información: aprendiz notificado sin prácticas', to: 't46537753@gmail.com' })

      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

/**
 * Llama el procedimiento almacenado que genera el informe semanal
 * @returns {Promise<any>}
 * @throws {DbError} Error estandar escrito
 * @async
 */
const querySchedule = async (): Promise<any> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>('call alerta_bisemanal()', [])
    return query[0]
  } catch (error) {
    throw new DbError('Error al conseguir los datos bisemanales')
  }
}
