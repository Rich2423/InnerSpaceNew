import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  serverExternalPackages: ['@supabase/supabase-js']
};

export default nextConfig;
