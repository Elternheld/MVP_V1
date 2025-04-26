/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  // Hiermit wird NIE statisch gebaut!
  dynamicRendering: true,
};

module.exports = nextConfig;
