import z from 'zod'

export const createBookingSchema = z.object({
  date: z.string({ required_error: 'Date is required' }).date()
})
