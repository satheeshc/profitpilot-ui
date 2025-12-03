# Deployment Troubleshooting Guide

## Issue: Changes Not Reflecting After Deployment

### Quick Checks (Do These First!)

1. **Test Backend Directly**
   - Open: https://profitpilot-server.onrender.com/health
   - Should return: `{"status":"ok",...}`
   - Open: https://profitpilot-server.onrender.com/api/stocks/value-stocks
   - Should return: JSON array (might be empty)

2. **Hard Refresh Browser**
   - Mac: `Cmd + Shift + R`
   - Windows: `Ctrl + Shift + R`

3. **Check Render Dashboard**
   - Go to: https://dashboard.render.com
   - Find: profitpilot-server
   - Check: Latest deploy succeeded?

4. **Check Vercel Dashboard**
   - Go to: https://vercel.com/dashboard
   - Find: profitpilot-ui
   - Check: Latest deploy from correct branch?

### Common Issues

**Issue 1: Render Free Tier Spin-Down**
- Render sleeps after 15 min inactivity
- First request takes 30-60 seconds
- Solution: Wait 1 minute after opening app

**Issue 2: Browser Cache**
- Try incognito/private window
- Clear cache and hard reload

**Issue 3: Wrong Branch Deployed**
- Vercel: Check if deploying from `feature/dev`
- Render: Check if deploying from `main`

**Issue 4: Environment Variables**
- Vercel must have: `VITE_API_URL` and `VITE_SOCKET_URL`
- If changed, must redeploy

### Force Redeploy

If needed, run these commands:

```bash
# Force Vercel redeploy
cd /Users/satheeshc/profitsignal/profitpilot-ui
git commit --allow-empty -m "Force redeploy"
git push origin feature/dev

# Force Render redeploy  
cd /Users/satheeshc/profitsignal/profitpilot-server
git commit --allow-empty -m "Force redeploy"
git push origin main
```
