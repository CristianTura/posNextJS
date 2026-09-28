import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.DOMAIN!,
        port: "4000",
      },
      {
        protocol: "https",
        hostname: process.env.DOMAIN!,
        port: "4000",
      },
      {
        protocol: "https",
        hostname: "rest.cloudinary.com",
        port: "",
      }
    ],
  },
};

export default nextConfig;
