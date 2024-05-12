import Product from '../models/product.js'

export const createProduct = async (req, res) => {
  const { name, category, price, providerId } = req.body

  try {
    const newProduct = new Product({ name, category, price, providerId })
    const productSaved = await newProduct.save()
    res.status(201).json(productSaved)
  } catch (err) {
    res.status(404).json({ message: 'Error creating product' })
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (err) {
    res.status(404).json({ message: 'Products not found' })
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (err) {
    res.status(404).json({ message: 'Product not found' })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(200).json(product)
  } catch (err) {
    res.status(404).json({ message: 'Product not found' })
  }
}
