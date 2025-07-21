import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin requests from specific development origins
  allowedDevOrigins: [
    '10.5.0.2'
  ],
  /* config options here */
};

export default nextConfig;
