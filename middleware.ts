import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define paths that are always accessible
  const publicPaths = ['/', '/api'];
  
  // Check if the path starts with any of the public paths
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Special handling for API routes - always allow access
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Get the token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  // If user is not logged in and trying to access a protected route
  if (!token && pathname.startsWith('/space')) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }
  
  // If user is logged in and trying to access login page
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/space', request.url));
  }
  
  // Continue for all other cases
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)',
  ]
};
