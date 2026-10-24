import type { NextConfig } from "next";

// A static export: `next build` writes plain HTML, CSS and JS to out/, which
// GitHub Pages serves as-is.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
