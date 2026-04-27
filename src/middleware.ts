import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  // Block /admin/* without session
  if (pathname.startsWith('/admin')) {
    if (!session?.user) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
    const role = (session.user as any).role;
    if (role !== 'ADMIN' && role !== 'PARTNER') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // If already logged in, /login redirects to /admin
  if (pathname === '/login' && session?.user) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
