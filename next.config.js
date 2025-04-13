/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure that Next.js understands the alias configuration
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;