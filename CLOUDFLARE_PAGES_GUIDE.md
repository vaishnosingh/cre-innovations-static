# The Complete, In-Depth Cloudflare Pages Deployment & GitHub CMS Guide
> **Platform**: CRE Innovations Careers (Static Edition)  
> **Cost**: $0.00 / month (100% Free on Cloudflare's generous free tier)  
> **Skill Level**: Complete beginner to advanced  

---

## Table of Contents
1. [Why Cloudflare Pages?](#1-why-cloudflare-pages)
2. [Prerequisites](#2-prerequisites)
3. [Method 1: Connect to GitHub (Recommended — Live CMS Auto-Deploy)](#3-method-1-connect-to-github-recommended--live-cms-auto-deploy)
   - [Step 1: Push your project to a GitHub repository](#step-1-push-your-project-to-a-github-repository)
   - [Step 2: Connect GitHub to Cloudflare Pages](#step-2-connect-github-to-cloudflare-pages)
   - [Step 3: Configure Build Settings](#step-3-configure-build-settings)
   - [Step 4: First Build & Live URL](#step-4-first-build--live-url)
4. [How to Edit Content Live on GitHub (Your Zero-Code CMS)](#4-how-to-edit-content-live-on-github-your-zero-code-cms)
5. [Method 2: Direct Drag-and-Drop (Zero Git · 30 Seconds)](#5-method-2-direct-drag-and-drop-zero-git--30-seconds)
6. [Connecting Your Custom Domain (e.g., careers.creinnovations.in)](#6-connecting-your-custom-domain-eg-careerscreinnovationsin)
   - [Scenario A: Domain managed on GoDaddy / Namecheap / Other](#scenario-a-domain-managed-on-godaddy--namecheap--other)
   - [Scenario B: Domain managed on Cloudflare DNS](#scenario-b-domain-managed-on-cloudflare-dns)
7. [How Cloudflare Pages Handles Security & Performance](#7-how-cloudflare-pages-handles-security--performance)
8. [Troubleshooting & FAQs](#8-troubleshooting--faqs)

---

## 1. Why Cloudflare Pages?

Cloudflare Pages is the gold standard for hosting modern static web applications:
- **Global Edge Network**: Your website is cached and served from **300+ data centers** worldwide. Visitors in Delhi, London, or New York experience sub-50ms load times.
- **100% Free**: Unlimited bandwidth, unlimited static requests, and up to 500 builds per month at **$0 cost**.
- **Automated SSL (HTTPS)**: Cloudflare provisions and auto-renews free TLS certificates for your domain.
- **Git Integration (CI/CD)**: Every time you commit a change to GitHub (like updating a job in `config_manager/careers.json`), Cloudflare automatically builds and deploys the new version within 90 seconds.
- **Zero Server Maintenance**: No operating system updates, no security patches, no database downtime.

---

## 2. Prerequisites

Before starting, ensure you have:
1. A free account on [Cloudflare](https://dash.cloudflare.com/sign-up).
2. A free account on [GitHub](https://github.com/join).
3. The project folder: `cre-innovations-static` (or the provided `cre-innovations-static.zip`).
4. (Optional) Your custom domain name (e.g. `careers.creinnovations.in`).

---

## 3. Method 1: Connect to GitHub (Recommended — Live CMS Auto-Deploy)

Connecting your project to GitHub gives you an automated CI/CD pipeline. Whenever you edit content on GitHub, your live website updates automatically.

### Step 1: Push your project to a GitHub repository

If your project is not yet on GitHub:

1. Open your terminal in the `cre-innovations-static` folder:
   ```bash
   cd /path/to/cre-innovations-static
   ```
2. Initialize Git (if not already a git repository):
   ```bash
   git init
   git add .
   git commit -m "Initial commit of CRE Innovations Static"
   ```
3. Go to [github.com/new](https://github.com/new) and create a new repository:
   - Repository name: `cre-innovations-careers`
   - Privacy: **Private** (recommended) or **Public**
   - Do NOT check "Initialize with README"
   - Click **Create repository**
4. Link and push your code (copy the commands from GitHub):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/cre-innovations-careers.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Connect GitHub to Cloudflare Pages

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left sidebar, click **Compute (Workers & Pages)**.
3. Click the blue **Create** button (top right).
4. Select the **Pages** tab (next to Workers).
5. Click **Connect to Git**.
6. If this is your first time:
   - Click **Add account** or select your GitHub account.
   - Authorize Cloudflare Pages.
   - Select either **All repositories** or only select `cre-innovations-careers`.
   - Click **Install & Authorize**.
7. In the repository list, choose **`cre-innovations-careers`** and click **Begin setup**.

---

### Step 3: Configure Build Settings

Cloudflare will ask for your build parameters. Fill them in exactly as shown below:

| Field | Value | Notes |
|---|---|---|
| **Project name** | `cre-innovations-careers` | This becomes your default `*.pages.dev` URL |
| **Production branch** | `main` (or `master`) | The branch Cloudflare watches for live updates |
| **Framework preset** | `None` or `Next.js (Static Export)` | `None` is completely fine |
| **Build command** | `npm run build` | Compiles your pages into `out/` |
| **Build output directory** | `out` | **CRITICAL**: Must be `out` (not `.next`) |
| **Root directory** | `/` (leave blank) | |

#### Environment Variables (Crucial Step):
Under **Environment variables (advanced)**, click **Add variable**:
- **Variable name**: `NODE_VERSION`
- **Value**: `20`

*(This ensures Cloudflare's build runners use Node.js 20+ to compile Next.js 16).*

---

### Step 4: First Build & Live URL

1. Click **Save and Deploy**.
2. Cloudflare will initialize the build container, install dependencies, run `npm run build`, and output all static files.
3. Once the build finishes (usually 1 to 2 minutes), you will see:
   > **🎉 Success! Your site is deployed!**
4. You will be given a free live URL:
   `https://cre-innovations-careers.pages.dev`
5. Click the link to view your live website! All animations, liquid glass cards, and pages will be fully interactive.

---

## 4. How to Edit Content Live on GitHub (Your Zero-Code CMS)

Because all website content lives inside clean JSON files in `config_manager/`, anyone on your team can edit the website directly on GitHub without touching terminal or code:

### Example: Adding or Editing a Job Posting
1. Go to your repository on **github.com**.
2. Click on the **`config_manager/`** folder.
3. Click on **`careers.json`**.
4. Click the ✏️ **Pencil icon** in the upper right to edit the file in your browser.
5. Find the `jobs` array:
   ```json
   {
     "id": "11",
     "visible": true,
     "slug": "lead-ai-researcher",
     "title": "Lead AI Researcher",
     "department": "web-ai",
     "location": "Delhi, India",
     "experience": "4-7 yrs",
     "type": "Full-time",
     "description": "Lead deep learning experiments, train custom diffusion models, and architect next-generation AI workflows."
   }
   ```
6. Scroll down, write a commit message (e.g., `Add Lead AI Researcher job`), and click **Commit changes**.
7. **What happens automatically**:
   - Cloudflare Pages detects the commit within seconds.
   - It runs `npm run build`, generates the new static job page (`/careers/lead-ai-researcher/`) and its application funnel (`/careers/lead-ai-researcher/apply/`).
   - In ~90 seconds, the new job is live on your website worldwide!

### Files You Can Edit in `config_manager/`:
- **`home.json`**: Update hero headlines, stats, "Why Join" benefits, domain tags.
- **`careers.json`**: Add/remove jobs, change experience requirements, toggle visibility (`"visible": false`).
- **`domains.json`**: Update tech stack badges and descriptions for Android, iOS, UI/UX, Web & AI.
- **`about.json`**: Update company history timeline and milestone counters.
- **`contact.json`**: Update Delhi office address, phone number, and inquiry topics.
- **`navbar.json` & `footer.json`**: Change navigation links, company description, and social media handles.

---

## 5. Method 2: Direct Drag-and-Drop (Zero Git · 30 Seconds)

If you do NOT want to use GitHub at all, you can upload the pre-compiled `out` folder directly to Cloudflare:

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Compute (Workers & Pages)**.
2. Click **Create** > **Pages** > **Upload assets**.
3. Project name: `cre-innovations-careers`.
4. Click **Create project**.
5. Drag and drop the **`out`** folder from `cre-innovations-static/out` into the drop area.
6. Click **Deploy site**.
7. Your site is live immediately!

*(Whenever you want to update, run `npm run build` locally and upload the new `out` folder).*

---

## 6. Connecting Your Custom Domain (e.g., `careers.creinnovations.in`)

By default, your site is available at `https://[your-project].pages.dev`. To use your own domain or subdomain:

1. In your Cloudflare Dashboard, go to your Pages project (`cre-innovations-careers`).
2. Click on the **Custom domains** tab at the top.
3. Click the blue **Set up a custom domain** button.
4. Type in your domain name:
   - For a subdomain: `careers.creinnovations.in`
   - For a root domain: `creinnovations.in`
5. Click **Continue**.

---

### Scenario A: Your Domain is on GoDaddy / Namecheap / External Registrar

If your domain DNS is managed outside Cloudflare (e.g. on GoDaddy):
1. Cloudflare will display a **DNS Record** that you need to add, for example:
   - **Type**: `CNAME`
   - **Name (Host)**: `careers` (for `careers.creinnovations.in`)
   - **Target (Value)**: `cre-innovations-careers.pages.dev`
   - **TTL**: Automatic (or 1 Hour)
2. Log in to your **GoDaddy DNS Management Console**.
3. Under DNS Records, click **Add New Record**.
4. Select `CNAME`, set Name to `careers`, set Value to `cre-innovations-careers.pages.dev`, and save.
5. Go back to Cloudflare Pages and click **Activate domain**.
6. Cloudflare will automatically verify the CNAME and issue a free SSL certificate. (Usually active in 5 to 15 minutes).

---

### Scenario B: Your Domain is Already on Cloudflare DNS

If your domain uses Cloudflare nameservers:
1. When you enter your domain in Cloudflare Pages and click **Continue**, Cloudflare will say:
   > *"We found that this domain is on your Cloudflare account. We will automatically create the DNS record for you."*
2. Click **Activate domain**.
3. The CNAME record is added automatically with Cloudflare proxy active, and your SSL certificate is ready immediately!

---

## 7. How Cloudflare Pages Handles Security & Performance

This static edition includes pre-configured rule files in `public/` that Cloudflare reads automatically:

### 1. `public/_headers`
- Sets **`Cache-Control: public, max-age=31536000, immutable`** on all Next.js static asset bundles (`/_next/static/*`), guaranteeing instantaneous page loads.
- Injects strict security response headers:
  - `X-Frame-Options: SAMEORIGIN` (prevents clickjacking)
  - `X-Content-Type-Options: nosniff` (prevents MIME sniffing)
  - `Referrer-Policy: origin-when-cross-origin`

### 2. URL Normalization
- Because `trailingSlash: true` is enabled in `next.config.mjs`, every page is exported as `[folder]/index.html`.
- Visiting `/careers/` or `/about/` works seamlessly on all browsers without server rewrite errors or 404 flashes.

---

## 8. Troubleshooting & FAQs

### Q1: The Cloudflare build failed with "Node version error" or "Syntax error"
- **Cause**: Cloudflare's default build runner might be using an older Node.js version.
- **Fix**: Go to your Pages project > **Settings** > **Environment variables** > Add `NODE_VERSION` with value `20`. Re-trigger the build.

### Q2: Images or CSS look unstyled
- **Cause**: Incorrect build output directory.
- **Fix**: Ensure **Build output directory** is set to `out` (NOT `.next` or `public`).

### Q3: When I reload a page like `/careers/senior-ios-engineer/`, will it show a 404?
- **No**. Because of Next.js static HTML export with `trailingSlash: true`, the file exists as `careers/senior-ios-engineer/index.html`. Cloudflare Pages natively serves this file directly.

### Q4: How do I change the notification email for candidate applications?
- Open `app/(marketing)/careers/[slug]/apply/ApplyPageClient.tsx` and `app/(marketing)/contact/ContactPageClient.tsx`.
- Search for `hr@creinnovations.in` and replace it with your preferred company email address.
