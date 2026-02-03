/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // When you set up custom domain (skytech-services.de), remove basePath and assetPrefix.
  basePath: '/skytech-solutions.de',
  assetPrefix: '/skytech-solutions.de',
};

export default nextConfig;
