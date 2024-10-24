import { cookies } from 'next/headers';
import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server';

import { COOKIES } from '@/constants';
import { CustomMiddleware } from '@/middlewares/chain'

export default function withAuth(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const cookieStore = await cookies();
    const token = cookieStore?.get(COOKIES.TOKEN);
    const response = NextResponse.next();
    return middleware(request, event, response);
  };
}
