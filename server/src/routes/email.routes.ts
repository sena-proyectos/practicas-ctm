import { type IRouter, Router } from 'express';
import { sendEmail } from "../controllers/email.controllers.js";
import { checkEmail } from '../middlewares/email.middleware.js';

const emailRoutes: IRouter = Router()

emailRoutes.post('/sendEmail', checkEmail, sendEmail)

export { emailRoutes }
