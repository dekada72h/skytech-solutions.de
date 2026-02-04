/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment (comment out for local dev on root path)
  basePath: '/skytech-solutions.de',
  assetPrefix: '/skytech-solutions.de',
};

export default nextConfig;

