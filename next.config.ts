import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['sequelize'],
  trailingSlash: true,
  distDir: '.next'
};

export default nextConfig;
