import express from 'express'
import cors from 'cors'

import { indexRoutes } from './routes/routes.js'

const app = express()

app.use(express.json())
app.use(cors())

// const APILINK = '/api'

app.use(indexRoutes)

// No found route
app.use((_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
})

export { app }
