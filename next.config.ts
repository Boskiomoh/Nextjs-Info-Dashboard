import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.110', 'localhost:3000'],
  outputFileTracingRoot: require('path').join(__dirname, './'),
};

export default nextConfig;
