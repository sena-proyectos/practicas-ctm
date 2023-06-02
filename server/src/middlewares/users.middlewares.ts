import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { connection } from '../config/db.js'
import { type passwordCompare, type LoginData, type idNumber } from '../models/user.interfaces.js'

export const checkExistingUser = async ({ num_documento }: idNumber): Promise<boolean> => {
  const [user] = await connection.query('SELECT * FROM usuarios WHERE num_documento = ?', [num_documento])
  const check: boolean = Array.isArray(user) && user.length > 0
  return check
}

export const checkLoginData = ({ num_documento, contrasena }: LoginData): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

  if (Number.isNaN(num_documento) && contrasena.length === 0) return false
  if (num_documento === 0) return false
  if (contrasena === undefined || num_documento === undefined) return false
  if (String(num_documento).toString().length < 6) return false
  if (contrasena.match(passwordRegex) == null) return false

  return true
}

export const comparePassword = async ({ contrasena, dbPassword }: passwordCompare): Promise<boolean> => await bycrypt.compare(contrasena, dbPassword)

export const generateToken = (payload: object): string => jwt.sign({ data: payload }, 'secret', { expiresIn: '3h', algorithm: 'HS256' })
