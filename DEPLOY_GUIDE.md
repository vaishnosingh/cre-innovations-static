# CRE Innovations — Zero-Backend Static Deployment Guide
> **Deployable on GoDaddy, Cloudflare Pages, Netlify, GitHub Pages, or Any Web Host at $0 to Minimal Cost**

---

## 1. Overview & Architecture

This version of the **CRE Innovations Careers** website is built as a **pure static export** (`output: 'export'`). 

### Why is this better for GoDaddy & Cloudflare?
- **Zero Server Overhead**: Requires **no Node.js runtime**, **no PM2**, **no Docker**, and **no PostgreSQL database server**.
- **Minimal Cost**: Can be hosted completely **free** on Cloudflare Pages or for pennies on standard GoDaddy shared hosting (cPanel `public_html`).
- **100% Identical Visuals & Performance**: Every animation, liquid-glass refraction effect, dynamic island navbar, dark/light theme switcher, and 3D WebGL mesh is preserved with 60FPS fluid motion.
- **Serverless Form Handling**: Candidate applications and inquiries format directly into structured emails to `hr@creinnovations.in` with instant client-side feedback.
- **JSON Content CMS**: All text, stats, domain details, and job openings remain editable in [`config_manager/*.json`](file:///home/anonymous/Desktop/Website/cre-innovations-static/config_manager/).

---

## 2. Quick Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development preview
npm run dev

# 3. Build the static website (generates the `out/` folder)
npm run build

# 4. Preview the exported static build locally
npm run start
```

When you run `npm run build`, Next.js compiles all pages, styles, scripts, and images into a single self-contained directory named **`out/`**. The contents of **`out/`** are all you need to deploy!

---

## 3. Option A — Deploying to Cloudflare Pages (Recommended · $0 Cost)

Cloudflare Pages provides world-class global CDN delivery, automated HTTPS (SSL), and unlimited bandwidth on their free tier.

### Method 1: Drag & Drop (Easiest · Takes 1 minute)
1. Run `npm run build` on your computer.
2. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. Navigate to **Compute (Workers & Pages)** > **Create** > **Pages** > **Upload assets**.
4. Give your project a name (e.g. `cre-careers`).
5. Drag and drop the **`out`** folder directly into the browser upload box.
6. Click **Deploy site**.
7. *Your site is live instantly with an active SSL certificate!*
8. To connect your custom domain (e.g. `careers.creinnovations.in`), go to **Custom domains** tab in your Pages dashboard and enter your domain.

### Method 2: Git Repository (Automatic CI/CD)
1. Push this repository to GitHub or GitLab.
2. In Cloudflare Dashboard, go to **Pages** > **Connect to Git**.
3. Select your repository.
4. Set the build settings:
   - **Framework preset**: `Next.js (Static Export)` or `None`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
5. Click **Save and Deploy**. Whenever you push changes to your Git repository, Cloudflare will rebuild and deploy the site automatically.

*(Note: The included `public/_headers` file will automatically configure optimal browser caching and security headers on Cloudflare Pages).*

---

## 4. Option B — Deploying to GoDaddy (cPanel / Shared Hosting)

If you have a GoDaddy shared hosting plan (Linux / cPanel / Apache):

### Step 1: Generate the Build
1. On your machine, run:
   ```bash
   npm run build
   ```
2. Navigate into the generated `out` folder and zip its contents, or run:
   ```bash
   cd out && zip -r ../cre-innovations-build.zip . && cd ..
   ```

### Step 2: Upload to GoDaddy cPanel
1. Log in to your **GoDaddy Account** and open your **cPanel Hosting Admin**.
2. Click on **File Manager**.
3. Navigate to your root web folder:
   - For your main domain: **`public_html/`**
   - For a subdomain (e.g. `careers.creinnovations.in`): **`public_html/careers/`** or the subdomain's document root.
4. If there are old default files (like `index.html` or `default.sec`), remove or backup them.
5. Click **Upload** in the top menu and select `cre-innovations-build.zip`.
6. Once uploaded, right-click `cre-innovations-build.zip` and select **Extract**.
7. Verify that `.htaccess` was extracted alongside the files. *(The included `.htaccess` ensures pretty URLs, Gzip compression, and browser caching work out of the box on GoDaddy Apache servers).*
8. Visit your domain in your browser!

---

## 5. Option C — Deploying to Other Static Hosts

Because the output is standard HTML/CSS/JS in `out/`:
- **Netlify**: Drag & drop the `out/` folder into Netlify Drop, or set Build command: `npm run build`, Publish directory: `out`.
- **GitHub Pages**: Deploy the `out/` folder to your `gh-pages` branch.
- **Vercel**: Deploy with Framework Preset: `Next.js`, Output Directory: `out`.
- **Self-Hosted Nginx / Apache VPS**: Copy `out/*` to `/var/www/html/`.

---

## 6. How to Edit Website Content

All website copy, hero badges, department listings, and contact info are driven by editable JSON files in [`config_manager/`](file:///home/anonymous/Desktop/Website/cre-innovations-static/config_manager/):

| File | What it Controls |
|---|---|
| `home.json` | Hero titles, stats, domain highlights, "Why Join" reasons, map coordinates |
| `about.json` | Story narrative, history timeline, company stats |
| `careers.json` | Open job positions, department filters, requirements, responsibilities |
| `domains.json` | iOS, Android, UI/UX, and Web & AI domain details and tech stacks |
| `contact.json` | Office address, phone numbers, contact topics |
| `navbar.json` | Header navigation links, logo text |
| `footer.json` | Footer navigation, social links, copyright notice |

### Updating Content:
1. Open any of the `.json` files in `config_manager/` and update the text.
2. Run `npm run build` to re-generate the static site.
3. Upload the updated `out/` folder to Cloudflare Pages or GoDaddy.

---

## 7. How Candidate Applications & Inquiries Work

In this serverless static edition:
1. **Careers Application Form**:
   - The multi-stage application wizard ([`ApplyPageClient.tsx`](file:///home/anonymous/Desktop/Website/cre-innovations-static/app/(marketing)/careers/[slug]/apply/ApplyPageClient.tsx)) guides candidates through 4 steps (Personal Info, Professional Experience, Resume selection, Review).
   - Upon submission, it packages the candidate's responses into a formatted email addressed to `hr@creinnovations.in`, opens their email client (Gmail / default mail app) with one click, and displays a verified confirmation screen.
   - Candidates attach their resume directly to the email. HR receives resumes in their corporate inbox without needing AWS S3 or database servers.
2. **Contact Form**:
   - Pre-formats the inquiry subject and body, directing it straight to `hr@creinnovations.in` with immediate client-side confirmation.
