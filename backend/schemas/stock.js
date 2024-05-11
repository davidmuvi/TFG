import z from 'zod'

export const createStockSchema = z.object({
  quantity: z.number({ required_error: 'Quantity is required' }).int()
})
