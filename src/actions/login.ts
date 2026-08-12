'use server'

import wait from 'waait';

import { type LoginInputs, type LoginResult,validateLogin } from '@/schemas/login'

export const loginAction = async (data: LoginInputs): Promise<LoginResult> => {
  // 這邊邏輯可以用 call server api
  await wait(2000);

  return validateLogin(data);
}
