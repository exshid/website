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
};

module.exports = nextConfig;
