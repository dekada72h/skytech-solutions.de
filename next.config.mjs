/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
