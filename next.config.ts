// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        // troque para localhost:
      destination: 'http://10.0.2.5:3001/image/:path*',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/image/:path*',
      },
    ],
  },
}

module.exports = nextConfig
