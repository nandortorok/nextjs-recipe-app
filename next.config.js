/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      process.env.SUPABASE_DOMAIN,
    ],
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
