import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep production checks from replacing the running dev server's route manifests.
  distDir: process.env.NODE_ENV === 'production' ? '.next-build' : '.next',
  experimental: {
    agentUpgrade: 'security',
  },
};

export default nextConfig;
