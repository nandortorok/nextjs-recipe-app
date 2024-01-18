/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  webpack(config) {
    config.infrastructureLogging = {
      level: "error",
    };
  },
};

module.exports = nextConfig;
