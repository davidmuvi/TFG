import z from 'zod'

export const createTableSchema = z.object({
  capacity: z.number({ required_error: 'Capacity is required' }).int().positive()
})
