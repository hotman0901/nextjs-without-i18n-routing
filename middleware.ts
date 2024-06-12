import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export default function middleware(request: NextRequest) {
  console.log('====================================');
  console.log(123123);
  console.log('====================================');
  const nextUrl = request.nextUrl;
  nextUrl.searchParams.delete('key'); // <-- this is now possible! 🎉
  return NextResponse.rewrite(nextUrl);
}
