import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-hosted font (see globals.css). Cached for good, so give the file a new name if the font ever changes.
  async headers() {
    return [
      {
        source: "/fonts/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
