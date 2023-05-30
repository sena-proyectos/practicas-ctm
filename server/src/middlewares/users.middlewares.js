import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { pool } from '../config/db.js'

export const checkExistingUser = async ({ idNumber }) => {
  const [user] = await pool.query('SELECT * FROM usuarios WHERE num_documento = ?', [idNumber])
  return user.length > 0
}

export const checkLoginData = ({ data }) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

  if (!data) return false

  if (!data.idNumber) return false
  if (data.idNumber === isNaN) return false
  if (data.idNumber.length < 6) return false

  if (!data.password) return false
  if (data.password === passwordRegex) return false

  return true
}

export const comparePassword = async ({ password, dbPassword }) => await bycrypt.compare(password, dbPassword)

export const generateToken = (payload) => jwt.sign({ data: payload }, 'secret', { expiresIn: '3h', algorithm: 'HS256' })
