// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // --- GitHub Pages Configuration for Root ---
  output: 'export', // Keep for static export
  trailingSlash: true, // Keep, recommended for GitHub Pages

  images: {
     unoptimized: true, // Keep, required for next export
  },

  // basePath: undefined, // Ensure NO basePath is set for root deployment
  // assetPrefix: undefined, // Ensure NO assetPrefix is set for root deployment
  // --- End GitHub Pages Configuration ---
};

export default nextConfig; // Assuming you use export default for .ts config
// If using module.exports in .ts, change to: module.exports = nextConfig;