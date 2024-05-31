import Client from '../models/client.js'

class ClientController {
  async createClient(req, res) {
    // Obtengo los datos del cliente a guardar
    const { name, telephone, email } = req.body

    try {
      const newClient = new Client({ name, telephone, email })
      const clientSaved = await newClient.save()
      res.status(201).json(clientSaved)
    } catch (error) {
      res.status(404).json(error.message)
    }
  }

  async getAllClients(req, res) {
    try {
      const clients = await Client.find()
      res.status(200).json(clients)
    } catch (error) {
      res.status(404).json({ message: 'Clients not found' })
    }
  }

  async getClientByTelephone(req, res) {
    try {
      const client = await Client.findOne({ telephone: req.params.telephone })
      res.status(200).json(client)
    } catch (error) {
      res.status(404).json({ message: 'Client not found' })
    }
  }

  async getClientById(req, res) {
    try {
      const client = await Client.findById(req.params.id)
      res.status(200).json(client)
    } catch (error) {
      res.status(404).json({ message: 'Client not found' })
    }
  }

  async updateClientById(req, res) {
    try {
      // La opción new: true devuelve el cliente actualizado
      const clientFound = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).json(clientFound)
    } catch (error) {
      res.status(404).json({ message: 'Client not found' })
    }
  }

  async deleteClientById(req, res) {
    try {
      await Client.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: 'Client deleted' })
    } catch (error) {
      res.status(404).json({ message: 'Client not found' })
    }
  }
}

export const clientController = new ClientController()