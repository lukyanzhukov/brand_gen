/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hh.ru', 'api.hh.ru', 'img.hhcdn.ru', 'images.unsplash.com'],
  },
  serverExternalPackages: ['openai'],
  // Увеличиваем таймауты для API routes
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
