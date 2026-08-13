import { z } from 'zod';

type ValidationKey =
  | 'nameRequired'
  | 'nameTooLong'
  | 'passwordRequired'
  | 'passwordNotAString'
  | 'passwordTooShort';

// 只依賴「給 key 回字串」這個能力，所以 client 的 useTranslations('Validation')
// 與 server 的 getTranslations('Validation') 都能直接傳進來
type Translate = (key: ValidationKey) => string;

export function createLoginSchema(t: Translate) {
  return z.object({
    name: z
      .string()
      .min(1, { message: t('nameRequired') })
      .max(6, { message: t('nameTooLong') }),
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? t('passwordRequired')
            : t('passwordNotAString'),
      })
      .min(6, { message: t('passwordTooShort') }),
  });
}

// 型別不受翻譯影響，用回傳型別推導即可
export type LoginInputs = z.infer<ReturnType<typeof createLoginSchema>>;

export type LoginResult =
  | { success: true; data: LoginInputs }
  | { success: false; error: z.core.$ZodErrorTree<LoginInputs> };

// 驗證邏輯只留一份，server action 與其他呼叫端共用
export function validateLogin(data: LoginInputs, t: Translate): LoginResult {
  const result = createLoginSchema(t).safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, error: z.treeifyError(result.error) };
}
