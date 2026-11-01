/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output full static HTML/CSS/JS export into the `out` directory
  output: "export",
  
  // Clean URLs with trailing slashes compatible with GoDaddy Apache, Cloudflare Pages, and static CDNs
  trailingSlash: true,

  // Disable server-dependent Next.js image optimization service for static hosting
  images: {
    unoptimized: true,
  },

  // Remove the dev indicator toolbar
  devIndicators: false,
};

export default nextConfig;
