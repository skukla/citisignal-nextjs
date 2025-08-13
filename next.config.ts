import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'citisignal-com774.adobedemo.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'delivery-p57319-e1619941.adobeaemcloud.com',
        pathname: '/adobe/assets/**',
      }
    ],
  },
};

export default nextConfig;
