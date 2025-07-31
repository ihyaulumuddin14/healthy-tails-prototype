import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "picsum.photos",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "images.unsplash.com",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "*.cloudfront.net",
            port: "",
            pathname: "/**",
         },
      ],
   },
};

export default nextConfig;
