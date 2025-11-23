# Network Access Guide for ProfitSignal

This guide explains how to make your ProfitSignal application accessible from anywhere.

## Option 1: Local Network Access (Same WiFi/LAN)

Access the application from any device on your local network (same WiFi).

### Steps:

1. **Restart both servers** (they're already configured):
   ```bash
   # In terminal 1 - Backend
   cd /Users/satheeshc/profitsignal/server
   npm run dev
   
   # In terminal 2 - Frontend  
   cd /Users/satheeshc/profitsignal/ui
   npm run dev
   ```

2. **Find your local IP address**:
   ```bash
   # On Mac
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Or simply
   ipconfig getifaddr en0
   ```

3. **Access from any device on the same network**:
   - Frontend: `http://YOUR_LOCAL_IP:5173`
   - Backend API: `http://YOUR_LOCAL_IP:5001`
   
   Example: If your IP is `192.168.1.100`:
   - Frontend: `http://192.168.1.100:5173`
   - Backend: `http://192.168.1.100:5001`

### Firewall Settings (if needed):

On macOS, you might need to allow incoming connections:
1. Go to **System Preferences** → **Security & Privacy** → **Firewall**
2. Click **Firewall Options**
3. Make sure Node.js is allowed to accept incoming connections

---

## Option 2: Internet Access (Anywhere in the world)

### A. Using Ngrok (Temporary - Easy Setup)

Ngrok creates a secure tunnel to your local server.

1. **Install ngrok**:
   ```bash
   brew install ngrok
   ```

2. **Sign up** at https://ngrok.com and get your auth token

3. **Configure ngrok**:
   ```bash
   ngrok config add-authtoken YOUR_AUTH_TOKEN
   ```

4. **Expose your frontend**:
   ```bash
   ngrok http 5173
   ```
   
   This will give you a public URL like: `https://abc123.ngrok.io`

5. **Expose your backend** (in another terminal):
   ```bash
   ngrok http 5001
   ```

6. **Update frontend to use ngrok backend URL**:
   - Update `.env.local` in the UI folder with your ngrok backend URL

**Pros**: Super easy, works immediately
**Cons**: Temporary URLs (change on restart), free tier has limitations

---

### B. Deploy to Cloud (Permanent - Production)

#### Frontend (Vercel - Free)

1. **Prerequisites**:
   ```bash
   npm install -g vercel
   ```

2. **Build and deploy**:
   ```bash
   cd /Users/satheeshc/profitsignal/ui
   vercel
   ```

3. Follow the prompts. Your app will be live at a URL like: `https://profitsignal.vercel.app`

#### Backend (Render.com - Free Tier)

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add your `FINNHUB_API_KEY`
5. Deploy!

Your backend will be at: `https://your-app.onrender.com`

**Update frontend .env.local**:
```
VITE_API_BASE_URL=https://your-app.onrender.com
VITE_FINNHUB_API_KEY=your_key_here
```

---

### C. Deploy Both on Railway (Easiest Cloud Option)

Railway can host both frontend and backend in one place.

1. Sign up at https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Add both services (server and UI)
4. Set environment variables
5. Deploy!

**Pros**: Free tier, easy to use, automatic deployments
**Cons**: Free tier has hours limit per month

---

## Recommended Approach

**For testing with friends/family**: Use **Option 1** (Local Network) or **ngrok**

**For production/public access**: Use **Option 2B** (Vercel + Render) or **Option 2C** (Railway)

---

## Security Considerations

When exposing your app to the internet:

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Keep your Finnhub API key secure
3. **CORS**: Update CORS settings to only allow your domains in production
4. **HTTPS**: Use HTTPS in production (Vercel/Render provide this automatically)
5. **Rate Limiting**: Add rate limiting to prevent API abuse

---

## Troubleshooting

### Can't access from other devices?
- Check firewall settings
- Make sure both servers are running
- Verify you're on the same WiFi network
- Try disabling VPN temporarily

### Ngrok not working?
- Make sure you've added your auth token
- Check if ports 5173 and 5001 are already in use
- Try restarting ngrok

### Deployment failing?
- Check build logs for errors
- Verify all dependencies are in package.json
- Ensure environment variables are set correctly
