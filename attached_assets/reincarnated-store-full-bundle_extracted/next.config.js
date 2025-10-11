/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-cdn.com', 'assets.omniversalmedia.org'],
  },
};

module.exports = nextConfig;
