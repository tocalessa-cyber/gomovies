// app/middleware.js
export const config = {
  matcher: [
    '/movie/:path*',
    '/tv-show/:path*',
    '/person/:path*',
    '/search',
  ],
}

export function middleware(request) {
  // Middleware kosong, hanya untuk konfigurasi
}

export const runtime = 'edge';