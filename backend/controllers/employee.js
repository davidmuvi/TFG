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
    res.status(404).json({ message: 'Error creating employee' })
  }
}

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
    res.status(200).json(employees)
  } catch (error) {
    res.status(404).json({ message: 'Employees not found' })
  }
}

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
    res.status(200).json(employee)
  } catch (error) {
    res.status(404).json({ message: 'Employee not found' })
  }
}

export const updateEmployeeById = async (req, res) => {
  try {
    const employeeFound = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(employeeFound)
  } catch (error) {
    res.status(404).json({ message: 'Employee not found' })
  }
}
