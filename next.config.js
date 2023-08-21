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
  async redirects() {
    await [
      {
        source: "/",
        destination: "/phonebook",
        permanent: true,
      },
      {
        source: "/phonebook/contact",
        destination: "/phonebook",
        permanent: true,
      },
    ];
  },
});

module.exports = nextConfig;
