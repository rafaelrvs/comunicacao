/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1) Proxy via rewrites
  async rewrites() {
    return [
      {
        source: '/image/:path*',
        destination: 'http://10.0.2.5:3001/image/:path*',
      },
    ]
  },

  // 2) Permitir hosts e portas para next/image
  images: {
    // Se você só usar o proxy acima e não expor o IP no client, pode omitir domains/remotePatterns.
    // Mas, caso use diretamente next/image sem unoptimized, configure:
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '10.0.2.5',
        port: '3001',
        pathname: '/image/:path*',
      },
    ],
  },
}

module.exports = nextConfig
