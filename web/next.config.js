/** @type {import('next').NextConfig} */
var path = require('path')
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
  webpack: (config, options) => {
    config.resolve.modules.push(path.resolve('.'))

    if (!options.isServer) {
      config.resolve.fallback = {
        fs: false,
        module: false,
      }
    }

    return config
  },
}

module.exports = nextConfig
