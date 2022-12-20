/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = {
  webpack(config) {
    config.infrastructureLogging = {
      level: "error",
    };
  },
};

module.exports = nextConfig;
