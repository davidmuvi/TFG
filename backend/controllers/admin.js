import Admin from '../models/admin.js'
import bcrypt from 'bcryptjs'

class AdminController {
  async createAdmin(req, res) {
    const { username, password } = req.body
    try {
      // Hasheo la contraseña para guardarla hasheada en la base de datos
      const passwordHash = await bcrypt.hash(password, 10)

      const newAdmin = new Admin({ username, password: passwordHash })
      const adminSaved = await newAdmin.save()
      res.status(201).json(adminSaved)
    } catch (err) {
      res.status(404).json({ message: 'Error creating admin' })
    }
  }
}

export const adminController = new AdminController()
