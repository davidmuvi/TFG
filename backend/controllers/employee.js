import Employee from '../models/employee.js'
import bcrypt from 'bcryptjs'

class EmployeeController {
  async createEmployee(req, res) {
    // Recupero los datos del empleado a guardar
    const { name, telephone, email, username, password, role } = req.body

    try {
      // Hasheo la contraseña para guardarla hasheada en la base de datos
      const passwordHash = await bcrypt.hash(password, 10)
      const newEmployee = new Employee({ name, telephone, email, username, password: passwordHash, role })
      const employeeSaved = await newEmployee.save()
      res.status(201).json(employeeSaved)
    } catch (error) {
      res.status(404).json({ message: 'Error creating employee' })
    }
  }

  async getAllEmployees(req, res) {
    try {
      const employees = await Employee.find()
      res.status(200).json(employees)
    } catch (error) {
      res.status(404).json({ message: 'Employees not found' })
    }
  }

  async getEmployeeById(req, res) {
    try {
      const employee = await Employee.findById(req.params.id)
      res.status(200).json(employee)
    } catch (error) {
      res.status(404).json({ message: 'Employee not found' })
    }
  }

  async updateEmployeeById(req, res) {
    try {
      // La opción new: true devuelve el empleado actualizado
      const employeeFound = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).json(employeeFound)
    } catch (error) {
      res.status(404).json({ message: 'Employee not found' })
    }
  }

  async deleteEmployeeById(req, res) {
    try {
      await Employee.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: 'Employee deleted' })
    } catch (error) {
      res.status(404).json({ message: 'Employee not found' })
    }
  }
}

export const employeeController = new EmployeeController()
