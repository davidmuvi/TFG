import z from 'zod'

export const createClientSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  telephone: z.string({ required_error: 'Telephone is required' }).regex(/^[6-7][0-9]{8}$/, 'Invalid phone number'),
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
})
