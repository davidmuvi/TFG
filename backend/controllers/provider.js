import Provider from '../models/provider.js'

export const createProvider = async (req, res) => {
  // Obtengo los datos del proveedor a guardar
  const { name } = req.body

  try {
    const newProvider = new Provider({ name })
    const providerSaved = await newProvider.save()
    res.status(201).json(providerSaved)
  } catch (error) {
    res.status(404).json({ message: 'Error creating provider' })
  }
}

export const getAllProviders = async (req, res) => {
  try {
    const clients = await Provider.find()
    res.status(200).json(clients)
  } catch (error) {
    res.status(404).json({ message: 'Providers not found' })
  }
}

export const getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id)
    res.status(200).json(provider)
  } catch (error) {
    res.status(404).json({ message: 'Provider not found' })
  }
}

export const updateProvider = async (req, res) => {
  try {
    const providerFound = await Provider.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(providerFound)
  } catch (error) {
    res.status(404).json({ message: 'Provider not found' })
  }
}

export const deleteProviderById = async (req, res) => {
  try {
    const providerDeleted = await Provider.findByIdAndDelete(req.params.id)
    res.status(200).json(providerDeleted)
  } catch (error) {
    res.status(404).json({ message: 'Provider not found' })
  }
}
