import schedule from 'node-schedule'
import { DbError } from '../errors/customErrors.js'
import { connection } from '../config/db.js'
import { type RowDataPacket } from 'mysql2'
import { sendEmailAnyBody, sendEmailAnyBodyNotfile } from '../controllers/email.controllers.js'
import XLSX from 'xlsx'
import { type IStudentData } from '../interfaces/scheduler.interfaces.js'

const rule = new schedule.RecurrenceRule()
rule.dayOfWeek = 1
rule.hour = 10
rule.minute = 0

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
          ${data
            .map(
              (item: IStudentData) => `
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
            </tr>`
            )
            .join('')}
        </tbody>
      </table>
    `

    const body = `
      <h1>Aprendices sin prácticas registradas:</h1>
      ${table}
    `

    await sendEmailAnyBody({
      body,
      subject: 'Informe bisemanal aprendices sin practicas en Practicas CTM',
      to: 'luismidev09@gmail.com',
      file
    })

    console.log('Correo enviado')
  } catch (error) {
    console.error('Ha ocurrido un error al ejecutar el scheduler', error)
  }
})

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

const sendEmailsToStudents = async (payload: IStudentData[]): Promise<void> => {
  try {
    for (const item of payload) {
      if (item.email_aprendiz) {
        const body = `<html><head><style>body{font-family:Arial, sans-serif;}.container{background-color: #A6E29B;border-radius: 15px;max-width:500px;margin:0 auto;padding: 20px;display:grid;grid-template-columns:1fr;gap:10px;color:black;}.title{text-align:center;margin:0;}.name-student{font-weight:bold;text-transform:uppercase;}.divider{width:50%;border-color: black;}.info-content{font-size:15px;text-align:center;margin:0;}.link{font-weight:bold;}.span{text-align:center;font-size:12.5px;font-weight:bold;}.image{width:50px; height:48px;margin-right:10px;}.info-footer{width: fit-content;display: grid;grid-template-columns: 1fr;margin: 0;padding: 0;text-align: center;justify-items: center;}.title-footer{margin:0px;}.footer{display:flex;gap:10px;width:fit-content;margin:auto;align-items:center;}</style></head><body><section class="container"><h3 class="title">Cordial saludo, aprendiz <span class="name-student">${item.nombre_aprendiz} ${item.apellido_aprendiz}.</span></h3><hr class='divider'></hr><p class="info-content">Usted se encuentra reportado sin prácticas actualmente, por favor contáctese con <a class="link" href="mailto:practicasctm@sena.edu.co">practicasctm@sena.edu.co</a> para buscar una alternativa de prácticas o actualizar su estado.</p><p class="span">***Correo generado automáticamente - No responder***</p><section class="footer"><img src="https://certificadossena.net/wp-content/uploads/2022/10/logo-sena-negro-png-2022-300x294.png" alt="logo" class="image"><div class="info-footer"><h3 class="title-footer">Servicio Nacional de Aprendizaje</h3><span>Centro Tecnológico del Mobiliario</span></div></section></section></body></html>`

        await sendEmailAnyBodyNotfile({
          body,
          subject: 'Información: aprendiz notificado sin prácticas',
          to: item.email_aprendiz
        })

        await new Promise((resolve) => setTimeout(resolve, 1000))
      } else {
        console.warn(`Email no definido para el aprendiz: ${item.nombre_aprendiz} ${item.apellido_aprendiz}`)
      }
    }
  } catch (error) {
    console.error('Error al enviar correos a los estudiantes:', error)
    throw new Error(error as string)
  }
}

const querySchedule = async (): Promise<any> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>('call alerta_bisemanal()', [])
    return query[0]
  } catch (error) {
    throw new DbError('Error al conseguir los datos bisemanales')
  }
}
