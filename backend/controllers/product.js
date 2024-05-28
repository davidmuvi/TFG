import Product from '../models/product.js'

class ProductController {
  async createProduct(req, res) {
    const { name, category, price, providerId } = req.body

    try {
      const newProduct = new Product({ name, category, price, providerId })
      const productSaved = await newProduct.save()
      res.status(201).json(productSaved)
    } catch (err) {
      res.status(404).json({ message: 'Error creating product' })
    }
  }

  async getProducts(req, res) {
    try {
      const products = await Product.find().populate('providerId')
      res.status(200).json(products)
    } catch (err) {
      res.status(404).json({ message: 'Products not found' })
    }
  }

  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id)
      res.status(200).json(product)
    } catch (err) {
      res.status(404).json({ message: 'Product not found' })
    }
  }

  async getProductByName(req, res) {
    try {
      const product = await Product.findOne({ name: req.params.name })
      res.status(200).json(product)
    } catch (err) {
      res.status(404).json({ message: 'Product not found' })
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
      res.status(200).json(product)
    } catch (err) {
      res.status(404).json({ message: 'Product not found' })
    }
  }

  async deleteProductById(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id)
      res.status(200).json(product)
    } catch (err) {
      res.status(404).json({ message: 'Product not found' })
    }
  }
}

export const productController = new ProductController()