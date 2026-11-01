# CRE Innovations — Careers & Corporate Website (Static Edition)

A high-performance, cinematic web application for **CRE Innovations**. Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**, engineered for zero-backend static deployment on **Cloudflare Pages**, **GoDaddy Shared Hosting (cPanel)**, or any static hosting service.

---

## Highlights

- **Pure Static Export (`output: 'export'`)**: Compiles to standalone HTML/CSS/JS in the `out/` folder.
- **Zero Backend Required**: No Node.js runtime, PM2, Docker, or PostgreSQL database needed.
- **Ultra-Low Cost**: Host for free on Cloudflare Pages or for minimal cost on GoDaddy cPanel.
- **Liquid Glass Aesthetic**: Physical refraction layers, dynamic lighting, and dark/light mode with native View Transitions.
- **JSON Content CMS**: Easily update website copy, stats, domain details, and job openings via [`config_manager/*.json`](./config_manager/).
- **Serverless Communications**: Contact messages and career applications format into direct emails to `hr@creinnovations.in`.
- **Pre-Configured Server Rules**:
  - Apache `.htaccess` included for GoDaddy cPanel hosting (URL rewrites, compression, security headers).
  - Cloudflare Pages `_headers` included for caching and CDN edge routing.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
# Open http://localhost:3000

# Build static website for deployment
npm run build
# The build output will be generated in `out/`
```

---

## Deployment Guides

Detailed, step-by-step instructions for deploying to **Cloudflare Pages**, **GoDaddy**, **Netlify**, and **GitHub Pages** are available in:

👉 **[DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)**
