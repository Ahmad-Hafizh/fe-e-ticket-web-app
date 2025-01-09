import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('tkn');
  if (!token?.value || !token) {
    return NextResponse.redirect(new URL('/unauthenticated', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/creator/:path*', '/setting/:path*', '/transaction/:path*'],
};
