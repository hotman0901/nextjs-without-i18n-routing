import { z } from 'zod'

import { LoginFormSchema } from '@/schemas/login'

type Inputs = z.infer<typeof LoginFormSchema>

export const loginEntry = async (data: Inputs) => {
  // 這邊邏輯可以用 call server api
  const result = LoginFormSchema.safeParse(data)
  console.log('🚀 ~ file: login.ts ~ line 9 ~ addEntry ~ result', result)

  if (result.success) {
    return { success: true, data: result.data }
  }

  if (result.error) {
    return { success: false, error: result.error.format() }
  }
}
