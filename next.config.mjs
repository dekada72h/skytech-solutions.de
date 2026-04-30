/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      // Old PV-Reinigung paths → new generic /standorte
      { source: '/pv-reinigung', destination: '/standorte', permanent: true },
      { source: '/pv-reinigung/:slug*', destination: '/standorte/:slug*', permanent: true },
    ];
  },
};

export default nextConfig;
