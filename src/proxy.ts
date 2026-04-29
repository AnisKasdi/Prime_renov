import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1. Définir les routes qui nécessitent une authentification
  const isProtectedRoute = path.startsWith('/admin') && path !== '/admin/login';
  
  if (isProtectedRoute) {
    const cookie = req.cookies.get('admin_session')?.value;
    const session = await verifySession(cookie);
    
    // Si pas de session valide, retour au login
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
    }
  }

  // 2. Rediriger l'utilisateur s'il est déjà connecté et tente d'aller sur /admin/login
  if (path === '/admin/login') {
    const cookie = req.cookies.get('admin_session')?.value;
    const session = await verifySession(cookie);

    if (session) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    }
  }

  return NextResponse.next();
}

// Configuration du matcher pour exclure les fichiers statiques, images et APIs
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|projects/).*)'],
};