import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A demonstração roda sem serviços externos: as imagens ficam em /public.
  images: {
    remotePatterns: [],
  },
  poweredByHeader: false,
};

export default nextConfig;
