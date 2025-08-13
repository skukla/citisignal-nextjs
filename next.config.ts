import type { NextConfig } from "next";

// Parse URLs from environment variables
if (!process.env.ADOBE_COMMERCE_URL) {
  throw new Error('ADOBE_COMMERCE_URL environment variable is required');
}

const commerceUrl = new URL(process.env.ADOBE_COMMERCE_URL);
const assetsUrl = process.env.ADOBE_ASSETS_URL ? new URL(process.env.ADOBE_ASSETS_URL) : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Adobe Commerce media files (required)
      {
        protocol: commerceUrl.protocol.replace(':', '') as 'http' | 'https',
        hostname: commerceUrl.hostname,
        pathname: '/media/**',
      },
      // Adobe Assets delivery (optional)
      ...(assetsUrl ? [{
        protocol: assetsUrl.protocol.replace(':', '') as 'http' | 'https',
        hostname: assetsUrl.hostname,
        pathname: '/adobe/assets/**',
      }] : []),
    ],
  },
  webpack: (config) => {
    // Add GraphQL file loader
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: '@graphql-tools/webpack-loader',
    });

    return config;
  },
};

export default nextConfig;