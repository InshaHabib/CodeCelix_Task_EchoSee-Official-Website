import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler for automatic optimizations
  reactCompiler: true,

  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // Disable source maps in production for faster builds
  productionBrowserSourceMaps: false,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Tree shake large packages
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  // Caching headers for static assets
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
