/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages
  output: 'export',
  // Temporarily disabled for development - uncomment for GitHub Pages deployment
  // basePath: process.env.NODE_ENV === 'production' ? '/FarhadLafarie' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/FarhadLafarie/' : '',
  images: {
    unoptimized: true,
  },
  // If you have routing issues with GitHub Pages:
  trailingSlash: true,
}

module.exports = nextConfig
