import { z } from 'zod';

export const LoginFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(6, { message: 'The name is too long' }),
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'This field is required' : 'Not a string',
    })
    .min(6, { message: 'Message must be at least 6 characters.' }),
});

export type LoginInputs = z.infer<typeof LoginFormSchema>;

export type LoginResult =
  | { success: true; data: LoginInputs }
  | { success: false; error: z.core.$ZodErrorTree<LoginInputs> };

// 驗證邏輯只留一份，server action 與其他呼叫端共用
export function validateLogin(data: LoginInputs): LoginResult {
  const result = LoginFormSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, error: z.treeifyError(result.error) };
}
