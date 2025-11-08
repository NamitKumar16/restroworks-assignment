import path from 'path'
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (webpackConfig) => {
    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias ?? {}),
      '@': path.resolve(process.cwd(), 'src'),
      '@payload-config': path.resolve(process.cwd(), 'src/payload.config.ts'),
    }

    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: '**.onrender.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
