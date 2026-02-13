import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.convex.cloud",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/settings",
        destination: "/editor",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
