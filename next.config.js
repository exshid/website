/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  
  images: {
    remotePatterns: [
    {
    protocol: "https",
    hostname: "**",
    },
    ],
    },  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, child_process: false, worker_threads: false };

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/posts',
        destination: '/api/posts/:path*',
      },
      {
        source: '/api/search',
        destination: '/api/search/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
