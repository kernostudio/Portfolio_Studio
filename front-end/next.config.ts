/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "i.ibb.co"], // ✅ allow Imgbb images too
  },
};

module.exports = nextConfig;
