import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'posnest-tbsm.onrender.com'
      },
      {
        protocol: "https",
        hostname: "rest.cloudinary.com"
      }
    ],
  },
};

export default nextConfig;
