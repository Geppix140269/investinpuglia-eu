/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the output: 'export' line - this allows dynamic routes
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig