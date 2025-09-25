import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow all external images - perfect for CMS where users add images from various sources
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS hostnames
      },
      {
        protocol: 'http',
        hostname: '**', // Allow all HTTP hostnames (for development)
      },
    ],
  },
};

export default nextConfig;
