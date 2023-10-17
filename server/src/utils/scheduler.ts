import schedule from 'node-schedule'
import { DbError } from '../errors/customErrors.js'
import { connection } from '../config/db.js'
import { type RowDataPacket } from 'mysql2'
import { sendEmailAnyBody } from '../controllers/email.controllers.js'

const rule = new schedule.RecurrenceRule()
rule.dayOfWeek = 1
rule.hour = 10
rule.minute = 0

export const schedulerTasks = schedule.scheduleJob(rule, async () => {
  try {
    const data = await querySchedule()

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
          ${data.map((item: any) => `
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

    // Construye el cuerpo del correo con la tabla
    const body = `
      <h1>Aprendices sin prácticas registradas:</h1>
      ${table}
    `

    sendEmailAnyBody({ body, subject: 'Scheduler', to: 'inf.practicasctm@outlook.com' })
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

const querySchedule = async (): Promise<any> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>('call alerta_bisemanal()', [])
    return query[0]
  } catch (error) {
    throw new DbError('Error al conseguir los datos bisemanales')
  }
}