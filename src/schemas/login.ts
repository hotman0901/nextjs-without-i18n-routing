import { z } from 'zod'

export const LoginFormSchema = z.object({
  name: z.string({ required_error: 'Name 為必填欄位' }),
  password: z
    .string({ required_error: 'Password 為必填欄位' })
    .min(6, { message: 'Message must be at least 6 characters.' })
})
