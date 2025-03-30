/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // If you're deploying to GitHub Pages:
  basePath: process.env.NODE_ENV === 'production' ? '/FarhadLafarie' : '',
  images: {
    unoptimized: true,
  },
  // If you have routing issues with GitHub Pages:
  trailingSlash: true,
}

module.exports = nextConfig
