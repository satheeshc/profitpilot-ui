# 🚀 Deployment Checklist - Vercel + Render

Complete step-by-step guide to deploy ProfitSignal to the cloud.

---

## ✅ Pre-Deployment Checklist

- [ ] Code is working locally
- [ ] Both servers run without errors
- [ ] You have a Finnhub API key
- [ ] Code is pushed to GitHub:
  - Frontend: https://github.com/satheeshc/profitpilot-frontend
  - Backend: https://github.com/satheeshc/profitsignal-server

---

## 📋 Deployment Order

**IMPORTANT**: Deploy backend first, then frontend (frontend needs backend URL)

---

## Part 1: Deploy Backend to Render 🔧

### Step 1: Sign Up for Render
1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub

### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Click "Build and deploy from a Git repository"
3. Connect your GitHub account (if not already connected)
4. Find and select `profitsignal-server` repository
5. Click "Connect"

### Step 3: Configure Service

**Basic Configuration:**
```
Name: profitsignal-backend
Region: Oregon (US West) or closest to you
Branch: main
Root Directory: (leave empty)
Runtime: Node
Build Command: npm install
Start Command: npm start
```

**Instance Type:**
- Select: **Free** ($0/month)

### Step 4: Add Environment Variables

Click "Advanced" → "Add Environment Variable"

Add these:
```
FINNHUB_API_KEY = your_actual_api_key_here
NODE_ENV = production
```

### Step 5: Deploy!

1. Click "Create Web Service"
2. Wait ~2-3 minutes for deployment
3. ✅ Your backend will be live!

### Step 6: Copy Your Backend URL

You'll get a URL like:
```
https://profitsignal-backend-xxxx.onrender.com
```

**SAVE THIS URL** - you'll need it for frontend deployment!

### Step 7: Test Backend

Visit: `https://your-backend-url.onrender.com/health`

You should see:
```json
{"status":"ok","timestamp":"2024-..."}
```

---

## Part 2: Deploy Frontend to Vercel ⚡

### Step 1: Sign Up for Vercel
1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"

### Step 2: Import Project
1. Click "Add New..." → "Project"
2. Find and import `profitpilot-frontend` repository
3. Click "Import"

### Step 3: Configure Project

Vercel auto-detects Vite settings. Verify:
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Step 4: Add Environment Variables

**CRITICAL STEP** - Add these environment variables:

```
VITE_FINNHUB_API_KEY = your_finnhub_api_key
VITE_API_BASE_URL = https://your-backend-url.onrender.com
```

**Replace:**
- `your_finnhub_api_key` with your actual Finnhub API key
- `your-backend-url.onrender.com` with the Render URL from Part 1, Step 6

**Example:**
```
VITE_FINNHUB_API_KEY = bsk1a2b3c4d5e6f7g8h9
VITE_API_BASE_URL = https://profitsignal-backend-abc123.onrender.com
```

### Step 5: Deploy!

1. Click "Deploy"
2. Wait ~2 minutes for build and deployment
3. ✅ Your frontend will be live!

### Step 6: Get Your Live URL

You'll get a URL like:
```
https://profitpilot-frontend-xxxx.vercel.app
```

**Visit this URL** to see your live app! 🎉

---

## Part 3: Update Backend CORS 🔒

Your backend needs to accept requests from your Vercel domain.

### Option A: Allow All Origins (Quick, Less Secure)
Already configured - no changes needed!

### Option B: Restrict to Your Domain (Recommended for Production)

1. Open `/Users/satheeshc/profitsignal/server/server.js`

2. Update CORS config:
```javascript
const io = new Server(server, {
    cors: {
        origin: "https://profitpilot-frontend-xxxx.vercel.app", // Your Vercel URL
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: "https://profitpilot-frontend-xxxx.vercel.app" // Your Vercel URL
}));
```

3. Commit and push to GitHub
4. Render will auto-deploy the update

---

## 🎊 You're Done!

Your app is now live on the internet!

**Frontend**: `https://profitpilot-frontend-xxxx.vercel.app`  
**Backend**: `https://profitsignal-backend-xxxx.onrender.com`

---

## 📱 Share Your App

Send your Vercel URL to anyone:
- ✅ Works on any device
- ✅ Works from anywhere in the world
- ✅ Automatic HTTPS
- ✅ Free forever (with limits)

---

## ⚡ Automatic Updates

Both platforms auto-deploy when you push to GitHub:

1. Make changes locally
2. Commit: `git add . && git commit -m "Update"`
3. Push: `git push origin main`
4. ✨ Auto-deploys in ~2 minutes!

---

## 🐛 Troubleshooting

### Frontend shows blank page
- Check browser console for errors
- Verify environment variables are set correctly
- Verify backend URL is correct

### API not working
- Check backend is running: Visit `/health` endpoint
- Verify CORS settings
- Check backend logs in Render dashboard

### Backend sleeping
- Free tier sleeps after 15 min of inactivity
- First request wakes it up (~30 seconds)
- Use UptimeRobot to keep it awake (see RENDER_DEPLOY.md)

### Environment variables not working
- Make sure Vite variables start with `VITE_`
- Redeploy after changing environment variables

---

## 📊 Monitor Your App

### Vercel Dashboard
- View deployment logs
- Monitor performance
- Check analytics

### Render Dashboard
- View application logs
- Monitor resource usage
- Check deployment status

---

## 🎯 Next Steps

- [ ] Add custom domain (both platforms support this free!)
- [ ] Set up monitoring/alerts
- [ ] Configure UptimeRobot to prevent backend sleep
- [ ] Add analytics (Google Analytics, Plausible, etc.)
- [ ] Set up error tracking (Sentry)

---

## 💰 Free Tier Limits

**Vercel:**
- 100 GB bandwidth/month
- Unlimited deployments
- Custom domains included

**Render:**
- 750 hours/month (enough for 24/7)
- Sleeps after 15 min inactivity
- 100 GB bandwidth/month

---

## 🆘 Need Help?

Detailed guides:
- Frontend: `VERCEL_DEPLOY.md`
- Backend: `RENDER_DEPLOY.md`
- Network: `NETWORK_ACCESS.md`

Support:
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Finnhub API: https://finnhub.io/docs

---

**Congratulations! Your app is live! 🚀**
