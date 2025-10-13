/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "i.ibb.co"], // ✅ allow Imgbb images too
  },
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during production build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
