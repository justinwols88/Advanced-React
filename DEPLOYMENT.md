# Deployment Guide

## Environment Variables

### For Local Development

Copy `.env.example` to `.env` (already done):

```bash
cp .env.example .env
```

### For Vercel Deployment

Add these in Vercel Dashboard → Settings → Environment Variables:

``` .env
VITE_API_BASE_URL=https://fakestoreapi.com
VITE_ENABLE_TRACING=false
VITE_APP_NAME=StyleCart
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEV_TOOLS=false
```

### For Netlify Deployment

Add these in Netlify Dashboard → Site Settings → Environment Variables:

``` .env
VITE_API_BASE_URL=https://fakestoreapi.com
VITE_ENABLE_TRACING=false
VITE_APP_NAME=StyleCart
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEV_TOOLS=false
```

## Quick Deploy

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables (see above)
5. Deploy!

### Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. "Add new site" → Import from Git
4. Add environment variables (see above)
5. Deploy!

## Testing Before Deploy

```bash
# Build production locally
npm run build

# Preview production build
npm run preview

# Run tests
npm test
npm run test:e2e
```

## Post-Deployment

After deployment, your site will be live at:

- **Vercel**: `https://your-app-name.vercel.app`
- **Netlify**: `https://your-app-name.netlify.app`

Every `git push` to main will auto-deploy updates!
