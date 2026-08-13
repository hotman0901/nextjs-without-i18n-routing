'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import wait from 'waait';

import { COOKIES, ROUTES } from '@/constants';
import {
  type LoginInputs,
  type LoginResult,
  validateLogin,
} from '@/schemas/login';

export const loginAction = async (
  data: LoginInputs,
): Promise<LoginResult | void> => {
  const t = await getTranslations('Validation');

  // 模擬呼叫後端 API 的延遲
  await wait(1000);

  const result = validateLogin(data, t);

  if (!result.success) {
    return result;
  }

  // 真實專案這裡會拿後端簽發的 JWT，這裡用假 token 示範
  const token = `fake-jwt-for-${result.data.name}`;
  const cookieStore = await cookies();

  cookieStore.set(COOKIES.TOKEN, token, {
    path: '/',
    // client 端的 JavaScript 讀不到，降低 XSS 竊取的風險
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
  });

  // redirect 會 throw，所以要放在所有回傳之後
  redirect(ROUTES.DASHBOARD);
};
