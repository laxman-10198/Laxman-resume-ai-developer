import type { NextConfig } from "next";

// On GitHub Pages the site lives under /<repo-name>, set by the deploy workflow.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",       // static HTML/JS/CSS in ./out, no server needed
  trailingSlash: true,    // /admin -> /admin/index.html, which GitHub Pages serves
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
