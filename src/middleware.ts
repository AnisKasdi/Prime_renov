import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = path.startsWith('/admin') && path !== '/admin/login';

  if (isProtectedRoute) {
    const cookie = req.cookies.get('admin_session')?.value;
    const session = await verifySession(cookie);
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
    }
  }

  if (path === '/admin/login') {
    const cookie = req.cookies.get('admin_session')?.value;
    const session = await verifySession(cookie);
    if (session) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|projects/).*)'],
};
