// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Wajib untuk Cloudflare Pages + next-on-pages
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'live.staticflickr.com',
        pathname: '/**',
      }
    ],
    unoptimized: true, // Wajib: Cloudflare Pages tidak support Next.js image optimization
  },
  
  // Optional: Untuk static export (jika semua halaman static)
  // output: 'export',
  
  // Experimental (opsional)
  experimental: {
    // serverComponentsExternalPackages: [], // jika perlu external packages
  }
}

module.exports = nextConfig