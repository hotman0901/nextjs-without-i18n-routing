'use server'

import wait from 'waait';
import { z } from 'zod'

import { LoginFormSchema } from '@/schemas/login'


type Inputs = z.infer<typeof LoginFormSchema>

export const loginAction = async (data: Inputs) => {
  // 這邊邏輯可以用 call server api
  const result = LoginFormSchema.safeParse(data)
  console.log('🚀 ~ server actions~~~', result)

  await wait(2000);

  if (result.success) {
    return { success: true, data: result.data }
  }

  if (result.error) {
    return { success: false, error: result.error.format() }
  }
}
