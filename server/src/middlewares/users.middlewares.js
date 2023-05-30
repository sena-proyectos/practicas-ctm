import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { pool } from '../config/db.js'

export const checkExistingUser = async ({ idNumber }) => {
  const [user] = await pool.query('SELECT * FROM usuarios WHERE num_documento = ?', [idNumber])
  return user.length > 0
}

export const checkLoginData = ({ idNumber, password }) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

  if (!idNumber && !password) return false

  if (!idNumber) return false
  if (idNumber === isNaN) return false
  if (idNumber.length < 6) return false

  if (!password) return false
  if (password === passwordRegex) return false

  return true
}

export const comparePassword = async ({ password, dbPassword }) => await bycrypt.compare(password, dbPassword)

export const generateToken = (payload) => jwt.sign({ data: payload }, 'secret', { expiresIn: '3h', algorithm: 'HS256' })
