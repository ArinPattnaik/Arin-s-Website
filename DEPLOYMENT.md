# Deployment Guides

Complete deployment instructions for **Vercel**, **Netlify**, **GitHub Pages**, and **Docker**.

## Table of Contents

1. [Vercel (Recommended)](#vercel-recommended)
2. [Netlify](#netlify)
3. [GitHub Pages](#github-pages)
4. [Docker](#docker)
5. [Custom Domain Setup](#custom-domain-setup)
6. [Environment Variables](#environment-variables)
7. [Troubleshooting](#troubleshooting)

---

## Vercel (Recommended)

**Why Vercel?** Best performance for React apps, automatic deployments on push, free tier includes custom domains.

### Step 1: Prepare Your Repository

```bash
# Ensure your code is ready
npm run lint
npm run build

# Push to GitHub
git push origin main
```

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended for easy integration)
3. Authorize Vercel to access your GitHub account

### Step 3: Import Project

1. Click **"New Project"** or go to [vercel.com/new](https://vercel.com/new)
2. Select **"Import Git Repository"**
3. Paste: `https://github.com/ArinPattnaik/Arin-s-Website`
4. Click **Import**

### Step 4: Configure Build Settings

Vercel auto-detects most settings, but verify:

| Setting | Value |
|---------|-------|
| **Framework Preset** | React |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Node Version** | 20.x (recommended) |

### Step 5: Deploy

1. Click **"Deploy"** button
2. Wait for build to complete (~2-3 minutes)
3. Once deployed, you'll get a URL like: `https://arins-website-xyz.vercel.app`

### Step 6: Enable Automatic Deployments

Vercel automatically deploys on `git push` to `main`. You can configure:

- **Production Branch**: `main`
- **Preview Branches**: All other branches get preview URLs
- **Automatic Rollback**: Enabled by default

### Step 7: Connect Custom Domain

1. In Vercel Dashboard → Settings → Domains
2. Enter `arinpattnaik.me`
3. Choose DNS option:
   - **Nameservers** (recommended): Update domain registrar
   - **CNAME**: If registrar doesn't support nameserver changes
4. Follow the DNS configuration from Vercel
5. Wait 15-30 minutes for DNS propagation

---

## Netlify

Alternative with similar features to Vercel.

### Step 1: Create Account

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub

### Step 2: Deploy from GitHub

1. Click **"New Site from Git"**
2. Connect to GitHub and select your repository
3. Configure build:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: 20.x

### Step 3: Deploy

1. Click **"Deploy Site"**
2. Monitor the build in the Netlify dashboard
3. Once complete, get your URL

### Step 4: Custom Domain

1. Domain Settings → Add Custom Domain
2. Enter `arinpattnaik.me`
3. Update DNS at your registrar
4. Wait for verification

---

## GitHub Pages

Free hosting directly from GitHub (limited to static files).

### Prerequisites

- Your repository must be public
- GitHub account with repo access

### Step 1: Build Static Files

```bash
npm run build
# Creates `dist/` folder with production build
```

### Step 2: Configure GitHub Pages

1. Go to **Repository Settings** → **Pages**
2. Source: Select **"Deploy from a branch"**
3. Branch: Select `main` or `gh-pages`
4. Folder: Select `/(root)` or `/docs`

### Step 3: Deploy Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy to GitHub Pages

on:
  push:
    branches: main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Step 4: Deploy

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deployment workflow"
git push origin main
```

Your site will be live at: `https://ArinPattnaik.github.io/Arin-s-Website`

### Step 5: Custom Domain (Optional)

1. In repo Settings → Pages
2. Under "Custom Domain": Enter `arinpattnaik.me`
3. Update DNS records at your registrar
4. Click "Enforce HTTPS" when ready

---

## Docker

For containerized deployment or local testing.

### Step 1: Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Build stage
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["http-server", "dist", "-p", "3000", "--cors"]
```

### Step 2: Create .dockerignore

```
node_modules
dist
.git
.env
.env.local
yarn.lock
package-lock.json
.DS_Store
```

### Step 3: Build & Run

```bash
# Build Docker image
docker build -t arins-portfolio .

# Run locally
docker run -p 3000:3000 arins-portfolio

# Visit http://localhost:3000
```

### Step 4: Push to Docker Hub (Optional)

```bash
# Login
docker login

# Tag image
docker tag arins-portfolio your-username/arins-portfolio:latest

# Push
docker push your-username/arins-portfolio:latest
```

### Step 5: Deploy to Docker-based Hosting

Services like **Railway**, **Render**, or **Fly.io** support Docker deployment:

1. Connect GitHub repo
2. Select Dockerfile
3. Deploy automatically on push

---

## Custom Domain Setup

### Prerequisites

- Registered domain (e.g., `arinpattnaik.me`)
- Access to domain registrar (GoDaddy, Namecheap, etc.)
- Chosen hosting platform (Vercel recommended)

### DNS Configuration (Vercel + Nameservers)

1. **In Vercel Dashboard**:
   - Settings → Domains
   - Add `arinpattnaik.me`
   - Copy nameservers:
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ```

2. **At Your Registrar** (GoDaddy, Namecheap, etc.):
   - Find "Nameservers" or "DNS Settings"
   - Replace existing nameservers with Vercel's
   - Save changes
   - Wait 15-30 minutes for propagation

3. **Verify**:
   ```bash
   nslookup arinpattnaik.me
   # Should show Vercel nameservers
   ```

### DNS Configuration (CNAME for Legacy Domains)

If nameservers don't work:

1. **In Vercel Dashboard**:
   - Get CNAME record value (e.g., `cname.vercel-dns.com`)

2. **At Your Registrar**:
   - Create DNS record:
     - **Type**: CNAME
     - **Name**: `@` or `arinpattnaik.me`
     - **Value**: `cname.vercel-dns.com`
   - Save changes

3. **Verify**:
   ```bash
   dig arinpattnaik.me CNAME
   ```

---

## Environment Variables

### Vercel

1. Dashboard → Settings → Environment Variables
2. Add variables:
   ```
   Key: VITE_API_KEY
   Value: your_actual_api_key
   ```
3. Redeploy to apply

### Netlify

1. Netlify UI → Site Settings → Build & Deploy → Environment
2. Add variables same as Vercel

### Local Development

Create `.env.local`:

```env
VITE_API_KEY=local_key_for_development
```

### GitHub Secrets (for CI/CD)

```bash
# Secret name in GitHub (Settings → Secrets and variables → Actions)
DEPLOY_KEY=your_deployment_secret

# Access in workflows:
${{ secrets.DEPLOY_KEY }}
```

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| **Build fails on deploy** | Node version mismatch | Ensure `package.json` specifies Node 18+ |
| **Styles not loading** | Tailwind not compiled | Check `@import` in `src/index.css` |
| **Blank page after deploy** | React not rendering | Check console errors, verify `index.html` paths |
| **Custom domain shows 404** | DNS not propagated | Wait 30 minutes, then clear browser cache |
| **Environment variables undefined** | Missing `VITE_` prefix | Prefix client vars with `VITE_` in `.env` |
| **Resume link broken** | Missing `public/resume.pdf` | Add resume PDF to `public/` folder |
| **TypeScript errors on deploy** | Strict checks enabled | Run `npm run lint` locally, fix before push |

### Debug Checklist

```bash
# 1. Local verification
npm install
npm run lint      # No TypeScript errors?
npm run build     # Builds successfully?
npm run preview   # Looks good locally?

# 2. Before pushing
git status        # Clean working directory?
git log --oneline -5  # Last commits look right?

# 3. After deploy
# Check live site in incognito mode
# Open DevTools → Console for errors
# Test responsiveness on mobile
# Verify all links work
```

---

## Next Steps

After successful deployment:

1. **Monitor**: Check deploy logs for warnings
2. **Test**: Visit your live site and test functionality
3. **SEO**: Verify Open Graph tags in DevTools
4. **Performance**: Run Lighthouse audit
5. **Analytics**: Add Google Analytics if desired
6. **Backup**: Regular Git commits for version control

---

**Questions?** Email [arinpattnaikofficial@gmail.com](mailto:arinpattnaikofficial@gmail.com)
