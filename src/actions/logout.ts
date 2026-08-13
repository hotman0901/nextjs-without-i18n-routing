'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { COOKIES, ROUTES } from '@/constants';

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIES.TOKEN);

  redirect(ROUTES.LOGIN);
}
