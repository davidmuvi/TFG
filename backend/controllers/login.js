import Admin from '../models/admin.js'
import Employee from '../models/employee.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const login = async (req, res, next) => {
  const { username, password } = req.body
  try {
    // Busco si hay un usuario en la base de datos con ese username
    const employeeFound = await Employee.findOne({ username })
    const adminFound = await Admin.findOne({ username })

    if (!employeeFound) {
      if (!adminFound) {
        return res.status(404).json({ message: 'Password or user incorrect' })
      }
      const passwordCorrect = await bcrypt.compare(password, adminFound.password)
      if (!passwordCorrect) {
        return res.status(404).json({ message: 'Password or user incorrect' })
      }

      const token = await createAccessToken({ username: adminFound.username, email: adminFound.email })
      res.json({
        token
      })
    } else {
      const passwordCorrect = await bcrypt.compare(password, employeeFound.password)
      if (!passwordCorrect) {
        return res.status(404).json({ message: 'Password or user incorrect' })
      }

      const token = await createAccessToken({ username: employeeFound.username, email: employeeFound.email })
      res.json({
        token
      })
    }

    // Si encuentra el usuario, compruebo si la contraseña es correcta
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const verifyToken = async (req, res) => {
  console.log(req.payload)
  res.status(200).json(req.payload)
}
