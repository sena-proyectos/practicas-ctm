import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { pool } from '../config/db.js'
import { errorsHandler } from '../utils/errorsHandler.js'

export const getUsers = async (_req, res) => {
  try {
    const [users] = await pool.query('SELECT * FROM users')
    res.status(200).json(users)
  } catch (error) {
    throw errorsHandler(res, error)
  }
}

export const getUserById = async ({ params }, res) => {
  const { id } = params
  try {
    const [user] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id])
    res.status(200).json(user)
  } catch (error) {
    throw errorsHandler(res, error)
  }
}

export const getTeachers = async (_req, res) => {
  try {
    const [teachers] = await pool.query('SELECT * FROM usuarios WHERE id_rol = 2', [])
    res.status(200).json(teachers)
  } catch (error) {
    throw errorsHandler(res, error)
  }
}

export const getTeachersById = async ({ params }, res) => {
  const { id } = params
  try {
    const [teacher] = await pool.query('SELECT * FROM usuarios WHERE id_rol = 2 AND id_usuario = ?', [id])
    res.status(200).json(teacher)
  } catch (error) {
    throw errorsHandler(res, error)
  }
}

const checkExistingUser = async ({ idNumber }) => {
  const [user] = await pool.query('SELECT * FROM usuarios WHERE num_documento = ?', [idNumber])
  return user.length > 0
}

export const createUser = async ({ body }, res) => {
  const { nombres: name, apellidos: lastName, tipo_documento: idType, num_documento: idNumber, correo_electronico: email, num_celular: phoneNumber, id_rol: role, contrasena: password } = body
  try {
    const existingUser = await checkExistingUser({ idNumber })
    if (!existingUser) throw errorsHandler(res, 'El usuario ya existe')

    const hashPassword = await bycrypt.hash(password, 10)

    await pool.query('INSERT INTO tbl_usuarios (nombres, apellidos, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, contrasena) VALUE (?, ?, ?, ?, ?, ?, ?, ?)', [name, lastName, idType, idNumber, email, phoneNumber, role, hashPassword])

    res.status(200).json(true)
  } catch (error) {
    throw errorsHandler(res, error)
  }
}

const checkLoginData = ({ data }) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

  if (!data) return false

  if (!data.idNumber) return false
  if (data.idNumber === isNaN) return false
  if (data.idNumber.length < 6) return false

  if (!data.password) return false
  if (data.password === passwordRegex) return false

  return true
}

const comparePassword = async ({ password, dbPassword }) => await bycrypt.compare(password, dbPassword)

export const login = async ({ body }, res) => {
  const { num_documento: idNumber, contrasena: password } = body
  try {
    const checkData = checkLoginData({ idNumber, password })
    if (!checkData) throw errorsHandler(res, 'Datos incorrectos')

    const [user] = await pool.query('SELECT * FROM usuarios WHERE correo_electronico = ?', [idNumber])
    if (!user) throw errorsHandler(res, 'El usuario no existe')

    const dbPassword = user[0].contrasena
    const isMatch = await comparePassword({ password, dbPassword })
    if (!isMatch) throw errorsHandler(res, 'Contraseña incorrecta')

    const token = generateToken(user)
    res.status(200).set('Authorization', `Bearer ${token}`)
  } catch (error) {
    throw errorsHandler(res, error)
  }
}

// ! TOKENS
const generateToken = (payload) => jwt.sign({ data: payload }, 'secret', { expiresIn: '3h', algorithm: 'HS256' })
