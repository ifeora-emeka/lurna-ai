import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const publicPaths = ['/', '/api', '/login', '/_next', '/favicon.ico'];
  
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  if (isPublicPath || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  console.log('[DEBUG] Middleware path:', pathname);
  console.log('[DEBUG] Token exists:', !!token);
  
  if (!token && pathname.startsWith('/space')) {
    const loginUrl = new URL('/login', request.url);
    console.log('[DEBUG] Redirecting to login:', loginUrl.toString());
    return NextResponse.redirect(loginUrl);
  }
  
  if (token && pathname === '/login') {
    const spaceUrl = new URL('/space', request.url);
    console.log('[DEBUG] Redirecting to space:', spaceUrl.toString());
    return NextResponse.redirect(spaceUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)',
  ]
};
