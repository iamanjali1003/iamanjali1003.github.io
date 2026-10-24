import type { NextConfig } from "next";

// A static export: `next build` writes plain HTML, CSS and JS to out/, which
// GitHub Pages serves as-is. Trailing slashes give directory-style URLs.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
