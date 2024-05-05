/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    URL_BASE: process.env.URL_BASE,
  },
};

module.exports = nextConfig;
