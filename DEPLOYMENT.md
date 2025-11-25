# AWS Amplify Deployment Guide

This guide covers deploying fullai.dev to AWS Amplify with your existing Route 53 and Certificate Manager setup.

## Prerequisites

- AWS account with appropriate permissions
- Domain configured in Route 53: fullai.dev
- SSL certificate in Certificate Manager for fullai.dev
- GitHub repository (for CI/CD)

## Deployment Steps

### 1. Initial Setup via AWS Console

1. **Navigate to AWS Amplify**
   - Go to AWS Console → AWS Amplify
   - Click "Get Started" under "Amplify Hosting"

2. **Connect Repository**
   - Select your Git provider (GitHub recommended)
   - Authorize AWS Amplify to access your repository
   - Select the `fullaidotdev` repository
   - Choose the `main` branch

3. **Configure Build Settings**
   - Amplify will auto-detect the `amplify.yml` configuration
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Review and confirm settings

4. **Deploy**
   - Click "Save and Deploy"
   - Wait for initial deployment to complete (typically 3-5 minutes)

### 2. Custom Domain Configuration

1. **Add Custom Domain**
   - In Amplify app settings → "Domain management"
   - Click "Add domain"
   - Select your Route 53 domain: fullai.dev
   - Amplify will automatically configure:
     - Root domain: fullai.dev
     - www subdomain: www.fullai.dev (optional)

2. **SSL Configuration**
   - Amplify will use your existing Certificate Manager certificate
   - Or automatically provision a new ACM certificate if needed
   - HTTPS will be enabled automatically

3. **DNS Configuration**
   - Amplify automatically creates Route 53 records:
     - A record (or ALIAS) for fullai.dev
     - CNAME for www.fullai.dev (if enabled)
   - DNS propagation: 15-60 minutes

### 3. Continuous Deployment

AWS Amplify automatically:
- Builds and deploys on every push to `main` branch
- Runs builds for pull requests (preview deployments)
- Invalidates CloudFront cache
- Provides deployment previews

## Build Configuration

The `amplify.yml` file configures the build process:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## Deployment via AWS CLI (Alternative)

If you prefer CLI deployment:

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize Amplify in project
amplify init

# Add hosting
amplify add hosting

# Select options:
# - Hosting with Amplify Console
# - Continuous deployment (Git-based)

# Publish
amplify publish
```

## Environment Variables

If you need environment variables (for future features):

1. Go to Amplify Console → App settings → Environment variables
2. Add variables (they'll be available during build)
3. Redeploy if needed

## Monitoring & Logs

- **Build logs**: Available in Amplify Console for each deployment
- **Access logs**: CloudWatch Logs automatically configured
- **Metrics**: CloudWatch metrics for requests, errors, latency

## Performance Features

AWS Amplify provides:
- **Global CDN**: CloudFront distribution (automatic)
- **HTTP/2 & HTTP/3**: Enabled by default
- **Compression**: Gzip/Brotli automatic
- **Caching**: Optimized cache headers
- **Edge locations**: Worldwide content delivery

## Cost Estimate

For a typical static site like fullai.dev:
- Build minutes: Free tier includes 1,000 minutes/month
- Hosting: Free tier includes 15 GB storage + 15 GB served
- Data transfer: ~$0.15/GB after free tier
- Expected monthly cost: $0-5 for small traffic volumes

## Troubleshooting

### Build Failures
- Check build logs in Amplify Console
- Verify `package.json` scripts are correct
- Ensure all dependencies are in `package.json`

### Domain Not Working
- Verify Route 53 hosted zone is correct
- Check DNS propagation: `dig fullai.dev`
- Wait up to 48 hours for global DNS propagation
- Verify certificate in Certificate Manager is issued

### SSL Certificate Issues
- Ensure certificate is in us-east-1 region (CloudFront requirement)
- Verify certificate covers both fullai.dev and www.fullai.dev
- Check certificate status is "Issued"

## Rollback

To rollback to a previous deployment:
1. Go to Amplify Console → App → Deployments
2. Find previous successful deployment
3. Click "Redeploy this version"

## Alternative: Deploy to S3 + CloudFront

If you prefer manual S3/CloudFront setup:

```bash
# Build the site
npm run build

# Deploy to S3 (requires AWS CLI configured)
aws s3 sync dist/ s3://fullai.dev --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## Resources

- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)
- [Route 53 Documentation](https://docs.aws.amazon.com/route53/)
