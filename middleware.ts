import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get("authjs.session-token") || request.cookies.get("__Secure-authjs.session-token")
  
  if (pathname.startsWith("/space")) {
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (pathname === "/login") {
    if (sessionToken) {
      const spaceUrl = new URL("/space", request.url)
      return NextResponse.redirect(spaceUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/space/:path*", "/login"]
}
