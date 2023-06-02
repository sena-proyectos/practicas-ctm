import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { connection } from '../config/db.js'
import { type passwordCompare, type LoginData, type idNumber } from '../models/userInterface.js'

export const checkExistingUser = async ({ idNumber }: idNumber): Promise<boolean> => {
  const [user] = await connection.query('SELECT * FROM usuarios WHERE num_documento = ?', [idNumber])
  const check: boolean = Array.isArray(user) && user.length > 0
  return check
}

export const checkLoginData = ({ idNumber, password }: LoginData): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

  if (Number.isNaN(idNumber) && password.length === 0) return false
  if (idNumber === 0) return false
  if (password === undefined || idNumber === undefined) return false
  if (String(idNumber).toString().length < 6) return false
  if (password.match(passwordRegex) == null) return false

  return true
}

export const comparePassword = async ({ password, dbPassword }: passwordCompare): Promise<boolean> => await bycrypt.compare(password, dbPassword)

export const generateToken = (payload: object): string => jwt.sign({ data: payload }, 'secret', { expiresIn: '3h', algorithm: 'HS256' })
