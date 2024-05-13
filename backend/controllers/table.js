import Table from '../models/table.js'

export const createTable = async (req, res) => {
  const { capacity } = req.body
  try {
    const newTable = new Table({ capacity })
    const tableSaved = await newTable.save()
    res.status(201).json(tableSaved)
  } catch (err) {
    res.status(404).json({ message: 'Error creating table' })
  }
}

export const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find()
    res.status(200).json(tables)
  } catch (err) {
    res.status(404).json({ message: 'Tables not found' })
  }
}

export const getTableById = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id)
    res.status(200).json(table)
  } catch (err) {
    res.status(404).json({ message: 'Table not found' })
  }
}

export const updateTableById = async (req, res) => {
  try {
    const table = await Table.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(200).json(table)
  } catch (err) {
    res.status(404).json({ message: 'Table not found' })
  }
}

export const deleteTableById = async (req, res) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id)
    res.status(200).json(table)
  } catch (err) {
    res.status(404).json({ message: 'Table not found' })
  }
}
