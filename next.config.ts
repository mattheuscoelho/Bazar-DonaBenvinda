// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Postimg (seu caso anterior)
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        pathname: "/**",
      },
      // Unsplash (erro atual)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;