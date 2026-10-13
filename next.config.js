/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // isolatedDevBuild is true by default in Next.js 16
  experimental: {
    isolatedDevBuild: true,
  },
};

module.exports = nextConfig;