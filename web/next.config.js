/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
      {
        protocol: 'https',
        hostname: '**.clerk.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/solutions',
        destination: '/advisory',
        permanent: true,
      },
      {
        source: '/start',
        destination: '/training',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
