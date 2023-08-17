/** @type {import('next').NextConfig} */

const withPWAConfig = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWAConfig({
  reactStrictMode: true,
});

module.exports = nextConfig;
