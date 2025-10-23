
import { chain } from '@/middlewares/chain';
import withAuth from '@/middlewares/withAuth';
import withPublicStatic from '@/middlewares/withPublic'


export default chain([withPublicStatic, withAuth ])

// 這幾個忽略
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
