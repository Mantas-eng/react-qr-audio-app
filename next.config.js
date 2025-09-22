/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false
  },
  images: {
    dangerouslyAllowSVG: true
  }
}
module.exports = nextConfig
