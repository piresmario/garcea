import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Default is 1MB; photo uploads (src/lib/supabase-storage.ts) allow up to 8MB,
    // so raise the Server Action body limit accordingly (with headroom for
    // multipart/form-data overhead).
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
