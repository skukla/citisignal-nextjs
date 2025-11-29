import type { NextConfig } from 'next';
import path from 'path';
import fs from 'fs';

// ============================================================================
// Demo Inspector Detection
// ============================================================================
// Check if demo-inspector submodule is initialized
// If not, webpack will alias @/demo-inspector to the stub module
const demoInspectorPath = path.join(__dirname, 'src/demo-inspector/index.ts');
const demoInspectorStubPath = path.join(__dirname, 'src/demo-inspector-stub');
const hasDemoInspector = fs.existsSync(demoInspectorPath);

if (!hasDemoInspector) {
  console.log('📦 Demo Inspector not installed - using stub module');
}

// ============================================================================
// Environment Configuration
// ============================================================================
// Parse URLs from environment variables
if (!process.env.ADOBE_COMMERCE_URL) {
  throw new Error('ADOBE_COMMERCE_URL environment variable is required');
}

const commerceUrl = new URL(process.env.ADOBE_COMMERCE_URL);
const assetsUrl = process.env.ADOBE_ASSETS_URL ? new URL(process.env.ADOBE_ASSETS_URL) : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Adobe Commerce media files with HTTPS (required)
      {
        protocol: 'https',
        hostname: commerceUrl.hostname,
        pathname: '/media/**',
      },
      // Adobe Commerce media files with HTTP (for legacy/dev environments)
      {
        protocol: 'http',
        hostname: commerceUrl.hostname,
        pathname: '/media/**',
      },
      // Adobe Assets delivery (optional)
      ...(assetsUrl
        ? [
            {
              protocol: assetsUrl.protocol.replace(':', '') as 'http' | 'https',
              hostname: assetsUrl.hostname,
              pathname: '/adobe/assets/**',
            },
          ]
        : []),
    ],
  },
  webpack: (config) => {
    // Add GraphQL file loader
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: '@graphql-tools/webpack-loader',
    });

    // TypeScript resolves @/demo-inspector to stub by default (for type checking)
    // Webpack overrides to real module when submodule is installed
    if (hasDemoInspector) {
      const demoInspectorRealPath = path.join(__dirname, 'src/demo-inspector');
      config.resolve.alias = {
        ...config.resolve.alias,
        '@/demo-inspector': demoInspectorRealPath,
      };
    }
    // When submodule not installed, TypeScript's path mapping to stub is used

    return config;
  },
};

export default nextConfig;
