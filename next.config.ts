import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Vercel expects .next; isolate only local production builds from the dev preview.
  distDir: process.env.VERCEL === '1'
    ? '.next'
    : process.env.NODE_ENV === 'production' ? '.next-build' : '.next',
  experimental: {
    agentUpgrade: 'security',
  },
};

export default nextConfig;
