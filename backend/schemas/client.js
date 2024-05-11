import z from 'zod'

export const createClientSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  telephone: z.number({ required_error: 'Telephone is required' }).int().min(9, { message: 'Telephone must be 9 digits' }).max(9, { message: 'Telephone must be 9 digits' }),
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  username: z.string({ required_error: 'Username is required' }),
  password: z.string({ required_error: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters' })
})
