import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

const locales = ['en', 'de'];

export default function middleware(req: NextRequest) {
  const nextUrl = req.nextUrl;
  const {pathname} = req.nextUrl;
  const locale = nextUrl.searchParams.get('locale') || 'en';

  // 如果語系不再白名單內直接給 default en
  if (!locales.includes(locale as any)) {
    const clone = new URL(req.url);
    // delete the path parts so all that remains are actual query params from inbound request
    const params = new URLSearchParams(clone.searchParams);
    params.set('locale', 'en');
    const a = pathname === '/' ? '' : pathname;
    const newUrl = nextUrl.origin + a + '/?' + params.toString();
    return NextResponse.redirect(new URL(newUrl, req.url));
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-locale', String(locale));
  const res = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
