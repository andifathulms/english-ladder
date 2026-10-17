const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // The engine is consumed as source from the monorepo, not from node_modules.
  transpilePackages: ['@ladder/core'],
  experimental: { externalDir: true },
};

export default nextConfig;
