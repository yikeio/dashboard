/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh']
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react']
  },
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true
    };
    return config;
  }
};

module.exports = nextConfig;
