import { Router } from 'express'
import { checkPublicToken, generatePublicToken } from '../controllers/publicAccess.controllers.js'

const publicAccess = Router()

publicAccess.get('/v1/public/token/generate', generatePublicToken)
publicAccess.get('/v1/public/token/check', checkPublicToken)

export { publicAccess }
