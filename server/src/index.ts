import { app } from './app.js'

const PORT = 3000

/**
 * Función que inicia el servidor con el puerto específicado
 * @param {number} PORT
 * @returns {void} Console.log(PORT)
 */
app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`)
})
