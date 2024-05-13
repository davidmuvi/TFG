import Admin from '../models/admin.js'
import Employee from '../models/employee.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const login = async (req, res) => {
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

      const token = await createAccessToken({ id: adminFound._id })
      res.cookie('ACCESS_TOKEN', token)
      res.json({
        id: adminFound._id,
        username: adminFound.username
      })
    } else {
      const passwordCorrect = await bcrypt.compare(password, employeeFound.password)
      if (!passwordCorrect) {
        return res.status(404).json({ message: 'Password or user incorrect' })
      }

      const token = await createAccessToken({ id: employeeFound._id })
      res.cookie('ACCESS_TOKEN', token)
      res.json({
        id: employeeFound._id,
        username: employeeFound.username
      })
    }

    // Si encuentra el usuario, compruebo si la contraseña es correcta
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}
