/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Key: let the build output to a temporary directory
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

module.exports = nextConfig;