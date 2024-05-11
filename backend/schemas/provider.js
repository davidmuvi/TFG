import z from 'zod'

export const createProviderSchema = z.object({
  name: z.string({ required_error: 'Name is required' })
})
