import Stock from '../models/stock.js'

export const createStock = async (req, res) => {
  const { productId, quantity } = req.body
  try {
    const newStock = new Stock({ productId, quantity })
    const stockSaved = await newStock.save()
    res.status(201).json(stockSaved)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find()
    res.status(200).json(stocks)
  } catch (error) {
    res.status(404).json({ message: 'Stocks not found' })
  }
}

export const getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id)
    res.status(200).json(stock)
  } catch (error) {
    res.status(404).json({ message: 'Stock not found' })
  }
}

export const updateStockById = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(200).json(stock)
  } catch (error) {
    res.status(404).json({ message: 'Stock not found' })
  }
}
