import Stock from '../models/stock.js'

class StockController {
  async createStock(req, res) {
    const { productId, quantity } = req.body
    try {
      const newStock = new Stock({ productId, quantity })
      const stockSaved = await newStock.save()
      res.status(201).json(stockSaved)
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  }

  async getAllStocks(req, res) {
    try {
      const stocks = await Stock.find()
      res.status(200).json(stocks)
    } catch (error) {
      res.status(404).json({ message: 'Stocks not found' })
    }
  }

  async getStockById(req, res) {
    try {
      const stock = await Stock.findById(req.params.id)
      res.status(200).json(stock)
    } catch (error) {
      res.status(404).json({ message: 'Stock not found' })
    }
  }

  async updateStockById(req, res) {
    try {
      const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
      res.status(200).json(stock)
    } catch (error) {
      res.status(404).json({ message: 'Stock not found' })
    }
  }

  async substractQuantity(req, res) {
    try {
      const stock = await Stock.findById(req.params.id)
      if (stock.quantity < req.body.quantity) {
        res.status(404).json({ message: 'Not enough stock' })
      }
      stock.quantity = stock.quantity - req.body.quantity
      await stock.save()
      res.status(200).json(stock)
    } catch (error) {
      res.status(404).json({ message: 'Stock not found' })
    }
  }
}

export const stockController = new StockController()