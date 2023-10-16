import schedule from 'node-schedule'
import { sendEmailAnyBody } from '../controllers/email.controllers.js'

const rule = new schedule.RecurrenceRule()
rule.dayOfWeek = 1
rule.hour = 10
rule.minute = 0

export const schedulerTasks = schedule.scheduleJob(rule, () => {
  const body =
  `<h1>Hola desde el scheduler</h1>
  <p>Este es un mensaje de prueba para probar el scheduler</p>`
  sendEmailAnyBody({ body, subject: 'Scheduler', to: 'inf.practicasctm@outlook.com' })
    .then(() => {
      console.log('Correo enviado')
    })
    .catch((err) => {
      console.error(err)
    })
})
