# Vercel Deployment Guide for Frontend

This frontend is configured to deploy on Vercel's free tier.

## Prerequisites

1. Your backend should be deployed first on Render
2. You need your backend URL (e.g., `https://profitsignal-backend.onrender.com`)

## Deployment Steps:

### 1. Push your code to GitHub
Make sure your latest code is pushed to: https://github.com/satheeshc/profitpilot-frontend

### 2. Sign up for Vercel
- Go to https://vercel.com
- Click "Sign Up"
- Choose "Continue with GitHub"

### 3. Import Your Project
- Click "Add New..." → "Project"
- Import `profitpilot-frontend` repository
- Vercel will auto-detect it's a Vite project

### 4. Configure the Project

**Framework Preset:** Vite (auto-detected)

**Build Settings:**
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `dist` (auto-filled)
- **Install Command**: `npm install` (auto-filled)

### 5. Environment Variables

Click "Environment Variables" and add:

**Required:**
```
VITE_FINNHUB_API_KEY=your_finnhub_api_key
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

Replace:
- `your_finnhub_api_key` with your actual Finnhub API key
- `your-backend-url.onrender.com` with your Render backend URL

**Example:**
```
VITE_FINNHUB_API_KEY=bsk1a2b3c4d5e6f7g8h9
VITE_API_BASE_URL=https://profitsignal-backend-abc123.onrender.com
```

### 6. Deploy!

Click "Deploy"

Vercel will:
1. Clone your repository
2. Install dependencies
3. Build your app
4. Deploy to CDN
5. Provide you with a URL like: `https://profitpilot-frontend.vercel.app`

## Your Live App

After deployment (takes ~2 minutes), your app will be live at:
```
https://profitpilot-frontend-xxxx.vercel.app
```

You can also add a custom domain for free!

## Post-Deployment

### Update Backend CORS (Important!)

Your backend needs to accept requests from your Vercel domain.

Update `/Users/satheeshc/profitsignal/server/server.js`:

```javascript
const io = new Server(server, {
    cors: {
        origin: "https://your-frontend-url.vercel.app",
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: "https://your-frontend-url.vercel.app"
}));
```

Then redeploy your backend on Render.

### Automatic Deployments

Vercel automatically redeploys when you push to GitHub:
- Push to `main` branch → Production deployment
- Push to other branches → Preview deployment

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Monitoring

### Vercel Dashboard
- View deployment logs
- Monitor performance
- Check analytics
- View error logs

### Speed Insights
Vercel provides free performance monitoring:
- Go to project → Analytics
- View Core Web Vitals
- See real user metrics

## Free Tier Limits

Vercel free tier includes:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Custom domains
- ✅ Automatic HTTPS
- ✅ Edge CDN
- ✅ Analytics

## Troubleshooting

### Build Fails
**Check:**
- Environment variables are set correctly
- All dependencies are in package.json
- Build works locally: `npm run build`

**View logs:**
- Click on the failed deployment
- View "Build Logs" tab

### App Loads but API Fails
**Check:**
- VITE_API_BASE_URL is correct
- Backend is running on Render
- CORS is configured on backend
- Backend environment variables are set

### Environment Variables Not Working
**Remember:**
- Vite env vars must start with `VITE_`
- Redeploy after changing env vars
- Clear cache if needed

## Testing Before Deployment

Test production build locally:
```bash
npm run build
npm run preview
```

Visit http://localhost:4173 to see production version

## Advanced: Preview Deployments

Every git branch gets its own URL:
- Create a branch: `git checkout -b feature/new-feature`
- Push to GitHub: `git push origin feature/new-feature`
- Vercel creates preview: `https://profitpilot-frontend-git-feature-new-feature.vercel.app`

Perfect for testing before merging to main!

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/guide/
- Vercel Discord: https://vercel.com/discord
test