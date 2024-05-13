import z from 'zod'

export const createTableSchema = z.object({
  tableNumber: z.number({ required_error: 'Table number is required' }).int().min(1, { message: 'Table number must be greater than 0' }),
  capacity: z.number({ required_error: 'Capacity is required' }).int().positive()
})
