import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "platform-lookaside.fbsbx.com"
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['mongodb']
  },
};

export default nextConfig;
