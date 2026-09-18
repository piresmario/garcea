import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Default is 1MB; photo uploads (src/lib/supabase-storage.ts) allow up to
    // 8MB each, and the gallery form now allows selecting several photos per
    // submission, so raise the Server Action body limit to fit a handful of
    // them (with headroom for multipart/form-data overhead).
    serverActions: {
      bodySizeLimit: "40mb",
    },
  },
};

export default nextConfig;
