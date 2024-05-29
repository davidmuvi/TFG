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
      res.status(404).json({ message: 'Stock not found' })
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

  async getStockByProductId(req, res) {
    try {
      const stock = await Stock.findOne({ productId: req.params.productId })
      res.status(200).json(stock)
    } catch (error) {
      res.status(404).json({ message: 'Stock not found' })
    }
  }

  async updateStockByProductId(req, res) {
    try {
      const stock = await Stock.findOne({ productId: req.params.productId })

      if (!stock) {
        return res.status(404).json({ message: 'Stock not found' })
      }

      const { quantity } = req.body
      stock.quantity = quantity
      await stock.save()
      res.status(200).json(stock)
    } catch (error) {
      res.status(404).json({ message: 'Stock not found' })
    }
  }

  async increaseStockByProductId(req, res) {
    try {
      const stock = await Stock.findOne({ productId: req.params.productId })

      if (!stock) {
        return res.status(404).json({ message: 'Stock not found' })
      }

      const { quantity } = req.body
      stock.quantity += quantity
      await stock.save()
      res.status(200).json(stock)
    } catch (error) {
      res.status(404).json({ message: 'Stock not found' })
    }
  }

  async decreaseStockByProductId(req, res) {
    try {
      const stock = await Stock.findOne({ productId: req.params.productId })

      if (!stock) {
        return res.status(404).json({ message: 'Stock not found' })
      }

      const { quantity } = req.body
      stock.quantity -= quantity
      await stock.save()
      res.status(200).json(stock)
    } catch (error) {
      res.status(404).json({ message: 'Stock not found' })
    }
  }

  async deleteStockById(req, res) {
    try {
      const stockDeleted = await Stock.findByIdAndDelete(req.params.id)
      res.status(200).json(stockDeleted)
    } catch (error) {
      res.status(404).json({ message: 'Stock not found' })
    }
  }
}

export const stockController = new StockController()