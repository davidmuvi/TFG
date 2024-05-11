import Employee from '../models/employee.js'
import bcrypt from 'bcryptjs'

export const createEmployee = async (req, res) => {
  const { name, telephone, email, username, password, role } = req.body

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const newEmployee = new Employee({ name, telephone, email, username, password: passwordHash, role })
    const employeeSaved = await newEmployee.save()
    res.status(201).json(employeeSaved)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
