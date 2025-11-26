# Vercel Deployment Guide

Deploy fullai.dev to Vercel with automatic HTTPS, global CDN, and continuous deployment - all for free.

## Why Vercel?

- **Free tier**: Perfect for static sites like fullai.dev
- **Native Astro support**: Zero configuration needed
- **Instant deployments**: 1-2 minutes typical
- **Free SSL**: Automatic HTTPS for custom domains
- **Global CDN**: Edge network in 100+ locations
- **Git integration**: Auto-deploy on push to main
- **No AWS costs**: Eliminates Route 53 and Amplify charges

## Quick Deployment (5 minutes)

### Step 1: Deploy to Vercel

1. Go to **https://vercel.com**
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. After signing in, click **"Add New..."** → **"Project"**
4. **Import** `diego-galeano/fullaidotdev` repository
5. Vercel auto-detects Astro and configures:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Click **"Deploy"**
7. Wait ~1-2 minutes - Done! ✅

Your site is now live at: `https://fullaidotdev.vercel.app`

### Step 2: Add Custom Domain

#### Option A: Use Vercel Nameservers (Recommended - Easiest)

1. **In Vercel project** → Settings → **Domains**
2. Add domain: `fullai.dev`
3. Vercel shows you **nameservers** (e.g., `ns1.vercel-dns.com`)
4. **At your domain registrar** (where you bought fullai.dev):
   - Go to DNS/Nameserver settings
   - Replace nameservers with Vercel's nameservers
   - Save changes
5. **Wait 15-60 minutes** for DNS propagation
6. Vercel automatically provisions SSL certificate
7. Done! ✅

**Benefits**:
- Vercel manages everything (DNS + SSL)
- Zero ongoing costs
- Fastest setup

#### Option B: Keep Existing Nameservers (Manual DNS)

If you want to keep your current nameservers:

1. **In Vercel project** → Settings → **Domains**
2. Add domain: `fullai.dev`
3. Vercel shows required DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. **Add these records** at your DNS provider (your current nameserver)
5. **Wait 15-60 minutes** for propagation
6. Vercel auto-provisions SSL when DNS validates
7. Done! ✅

### Step 3: Configure www Subdomain (Optional)

1. In Vercel → Domains
2. Add `www.fullai.dev`
3. Vercel automatically redirects www → root (or vice versa)

## Deployment Configuration

The `vercel.json` file includes:

- **Cache optimization**: Static assets cached for 1 year
- **Header configuration**: Optimal performance headers
- **Routing**: Proper SPA/static routing

No additional configuration needed - Vercel handles everything!

## Continuous Deployment

Every git push to `main` automatically:
1. Triggers Vercel build
2. Runs `npm run build`
3. Deploys to production
4. Updates `fullai.dev`
5. Invalidates CDN cache

## Preview Deployments

Every pull request gets:
- Unique preview URL (e.g., `fullaidotdev-git-feature.vercel.app`)
- Automatic deployment
- No impact on production

## Environment Variables

If needed in the future:

1. Vercel project → **Settings** → **Environment Variables**
2. Add variables for Production/Preview/Development
3. Access via `import.meta.env.VARIABLE_NAME` in Astro

## Monitoring & Analytics

Vercel provides (free):
- **Real-time logs**: Build and function logs
- **Analytics**: Page views, performance metrics
- **Deployment history**: Instant rollbacks
- **Edge caching stats**: Cache hit rates

## Performance Features

Vercel automatically provides:
- **Global CDN**: 100+ edge locations worldwide
- **Smart caching**: Automatic cache invalidation
- **Image optimization**: WebP/AVIF conversion (if you add `@astrojs/image`)
- **HTTP/3**: Enabled by default
- **Brotli compression**: Automatic
- **Zero cold starts**: Static serving

## CLI Deployment (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod

# Link to existing project
vercel link
```

## Cost (Free Tier)

- **Bandwidth**: 100GB/month
- **Build time**: 6,000 minutes/month
- **Deployments**: Unlimited
- **Team members**: 1 (Hobby plan)
- **Cost**: **$0/month** ✅

For fullai.dev, you'll stay well within free limits.

## Domain Registrars - Nameserver Location

Common registrars and where to update nameservers:

- **Namecheap**: Dashboard → Domain List → Manage → Nameservers
- **GoDaddy**: Domains → fullai.dev → DNS → Nameservers
- **Google Domains**: DNS → Name servers → Custom name servers
- **Cloudflare Registrar**: Already using Cloudflare DNS
- **Porkbun**: Domain Management → Authoritative Nameservers

## Troubleshooting

### Domain not verifying
- Wait longer (up to 48 hours for global DNS propagation)
- Check nameservers propagated: `dig NS fullai.dev`
- Verify nameservers match Vercel's exactly

### SSL certificate not issuing
- Ensure DNS records are correct
- Wait up to 24 hours for Let's Encrypt validation
- Check domain is accessible via HTTP first

### Build failing
- Check build logs in Vercel dashboard
- Verify `package.json` scripts work locally
- Ensure Node.js version compatibility (Vercel uses Node 18+ by default)

### Old content showing
- Vercel auto-invalidates cache, but browsers may cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check deployment went to production (not preview)

## Rollback

Instant rollback to any previous deployment:

1. Vercel Dashboard → Deployments
2. Find previous deployment
3. Click **"⋯"** → **"Promote to Production"**
4. Live in seconds

## Custom Deployment Settings

Create `.vercelrc` if you need specific Node version:

```json
{
  "buildCommand": "npm run build",
  "framework": "astro"
}
```

## Comparison: Vercel vs AWS Amplify

| Feature | Vercel | AWS Amplify |
|---------|--------|-------------|
| Cost | Free | Free tier limited |
| DNS | Free | $0.50/month (Route 53) |
| SSL | Free, auto | Free, but complex |
| Deploy time | 1-2 min | 3-5 min |
| Setup | 2 clicks | Multi-step |
| DX | Excellent | Good |

## Next Steps

1. Deploy to Vercel (vercel.com)
2. Import GitHub repo
3. Add custom domain `fullai.dev`
4. Update nameservers at your registrar

Your site will be live in ~5 minutes!
