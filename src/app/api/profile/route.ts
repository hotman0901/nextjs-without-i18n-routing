import { type NextRequest, NextResponse } from 'next/server';

import { COOKIES } from '@/constants';

export type Profile = {
  name: string;
  signedInAt: string;
};

/**
 * Route Handler 範例。
 * proxy.ts 的 matcher 排除了 /api，所以這裡要自己檢查 token。
 */
export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIES.TOKEN)?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // 假 token 的格式是 fake-jwt-for-{name}，真實專案這裡會驗證 JWT 簽章
  const name = token.replace(/^fake-jwt-for-/, '');

  const profile: Profile = {
    name,
    signedInAt: new Date().toISOString(),
  };

  return NextResponse.json(profile);
}
