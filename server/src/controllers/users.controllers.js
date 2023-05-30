import { pool } from '../config/db.js'
import { errorsHandler } from '../utils/errorsHandler.js'

export const getUsers = async (_req, res) => {
  try {
    const [users] = await pool.query('SELECT * FROM users')
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
  }
}

export const getUserById = async ({ params }, res) => {
  const { id_usuarios: idUsuario } = params
  try {
    const [user] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [idUsuario])
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
}

export const getTeachers = async (_req, res) => {
  try {
    const [teachers] = await pool.query('SELECT * FROM usuarios WHERE id_rol = 2', [])
    res.status(200).json(teachers)
  } catch (error) {
    console.log(error)
  }
}

export const getTeachersById = async ({ params }, res) => {
  const { id_usuarios: idUsuario } = params
  try {
    const [teacher] = await pool.query('SELECT * FROM usuarios WHERE id_rol = 2 AND id_usuario = ?', [idUsuario])
    res.status(200).json(teacher)
  } catch (error) {
    console.log(error)
  }
}

/* export const createUser = async ({ body }, res) => {
  const { nombres, apellidos, tipo_documento, num_documento, correo_electronico, num_celular, id_rol } = body
  try {
    const [user] = await pool.query('INSERT INTO usuarios SET ?', [body])
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
} */

const checkLoginData = ({ data }) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

  if (!data) return false

  if (!data.idNumber) return false
  if (data.idNumber === isNaN) return false
  if (data.idNumber.length < 6) return false

  if (!data.password) return false
  if (data.password === passwordRegex) return false
}

export const login = async ({ body }, res) => {
  const { num_documento: idNumber, contrasena: password } = body
  const checkData = checkLoginData({ idNumber, password })
  if (!checkData) return res.status(400).json({ error: 'Datos incorrectos' })
  try {
    const [user] = await pool.query('SELECT * FROM usuarios WHERE correo_electronico = ? AND contrasena = ?', [idNumber, password])
    res.status(200).json(user)
  } catch (error) {
    throw errorsHandler(res, error)
  }
}
