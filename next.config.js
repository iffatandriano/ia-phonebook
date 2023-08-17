/** @type {import('next').NextConfig} */

const withPWAConfig = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWAConfig({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
});

module.exports = nextConfig;
