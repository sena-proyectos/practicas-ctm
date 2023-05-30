import bycrypt from 'bcrypt'

import { pool } from '../config/db.js'
import { handleHTTP } from '../utils/errorsHandler.js'
import { checkExistingUser, checkLoginData, comparePassword, generateToken } from '../middlewares/users.middlewares.js'

export const getUsers = async (_req, res) => {
  try {
    const [users] = await pool.query('SELECT * FROM usuarios')
    res.status(200).json(users)
  } catch (error) {
    return handleHTTP(res, 'ERROR_GET_USERS')
  }
}

export const getUserById = async ({ params }, res) => {
  const { id } = params
  try {
    const [user] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id])
    res.status(200).json(user)
  } catch (error) {
    return handleHTTP(res, 'ERROR_GET_USER')
  }
}

export const getTeachers = async (_req, res) => {
  try {
    const [teachers] = await pool.query('SELECT * FROM usuarios WHERE id_rol = 2', [])
    res.status(200).json(teachers)
  } catch (error) {
    return handleHTTP(res, 'ERROR_GET_TEACHERS')
  }
}

export const getTeachersById = async ({ params }, res) => {
  const { id } = params
  try {
    const [teacher] = await pool.query('SELECT * FROM usuarios WHERE id_rol = 2 AND id_usuario = ?', [id])
    res.status(200).json(teacher)
  } catch (error) {
    return handleHTTP(res, 'ERROR_GET_TEACHER')
  }
}

export const createUser = async ({ body }, res) => {
  const { nombres: name, apellidos: lastName, tipo_documento: idType, num_documento: idNumber, correo_electronico: email, num_celular: phoneNumber, id_rol: role, contrasena: password } = body
  try {
    const existingUser = await checkExistingUser({ idNumber })
    if (!existingUser) throw handleHTTP(res, 'El usuario ya existe')

    const hashPassword = await bycrypt.hash(password, 10)

    await pool.query('INSERT INTO tbl_usuarios (nombres, apellidos, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, contrasena) VALUE (?, ?, ?, ?, ?, ?, ?, ?)', [name, lastName, idType, idNumber, email, phoneNumber, role, hashPassword])

    res.status(200).json(true)
  } catch (error) {
    return handleHTTP(res, 'ERROR_CREATE_USER')
  }
}

export const login = async ({ body }, res) => {
  const { num_documento: idNumber, contrasena: password } = body
  try {
    const checkData = checkLoginData({ idNumber, password })
    if (!checkData) throw handleHTTP(res, 'Datos incorrectos')

    const [user] = await pool.query('SELECT * FROM usuarios WHERE correo_electronico = ?', [idNumber])
    if (!user) throw handleHTTP(res, 'El usuario no existe')

    const dbPassword = user[0].contrasena
    const isMatch = await comparePassword({ password, dbPassword })
    if (!isMatch) throw handleHTTP(res, 'Contraseña incorrecta')

    const token = generateToken(user)
    res.status(200).set('Authorization', `Bearer ${token}`)
  } catch (error) {
    return handleHTTP(res, 'ERROR_LOGIN')
  }
}
