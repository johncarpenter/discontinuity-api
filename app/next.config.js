module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.medium.com",
      },
    ],
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
