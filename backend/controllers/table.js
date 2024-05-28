import Table from '../models/table.js'

class TableController {
  async createTable(req, res) {
    const { tableNumber, capacity } = req.body
    try {
      const newTable = new Table({ tableNumber, capacity })
      const tableSaved = await newTable.save()
      res.status(201).json(tableSaved)
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  }

  async getAllTables(req, res) {
    try {
      const tables = await Table.find()
      res.status(200).json(tables)
    } catch (err) {
      res.status(404).json({ message: 'Tables not found' })
    }
  }

  async getTableById(req, res) {
    try {
      const table = await Table.findById(req.params.id)
      res.status(200).json(table)
    } catch (err) {
      res.status(404).json({ message: 'Table not found' })
    }
  }

  async getTableByTableNumber(req, res) {
    try {
      const table = await Table.findOne({ tableNumber: req.params.tableNumber })
      res.status(200).json(table)
    } catch (err) {
      res.status(404).json({ message: 'Table not found' })
    }
  }

  async updateTableById(req, res) {
    try {
      const table = await Table.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
      res.status(200).json(table)
    } catch (err) {
      res.status(404).json({ message: 'Table not found' })
    }
  }

  async deleteTableById(req, res) {
    try {
      const table = await Table.findByIdAndDelete(req.params.id)
      res.status(200).json(table)
    } catch (err) {
      res.status(404).json({ message: 'Table not found' })
    }
  }
}

export const tableController = new TableController()