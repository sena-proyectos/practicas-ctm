import { app } from './app.js'

const PORT = 3000

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`)
})
