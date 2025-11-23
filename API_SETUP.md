# 🔑 Real-Time Data Setup Guide

## Quick Start: Enable Real-Time Stock Data

ProfitSignal can fetch real-time stock data from Finnhub API. Follow these simple steps:

### Step 1: Get Your Free API Key

1. Visit [Finnhub.io](https://finnhub.io/register)
2. Sign up for a free account (no credit card required)
3. Verify your email
4. Copy your API key from the dashboard

**Free Tier Includes:**
- 60 API calls per minute
- Real-time stock quotes
- Historical data
- Company profiles
- WebSocket support

### Step 2: Add Your API Key

Open `src/services/stockService.js` and replace the demo key:

```javascript
// Line 4-5
const FINNHUB_API_KEY = 'your_actual_api_key_here'; // Replace 'demo' with your key
```

### Step 3: Enable Real-Time Data

1. Start the development server: `npm run dev`
2. Open http://localhost:5173/
3. Click the **"Enable Real-Time"** button at the top
4. Watch as real stock data loads!

---

## Features with Real-Time Data

### ✅ What Works with Real API
- Live stock prices (updates every 60 seconds)
- Real percentage changes
- Actual high/low prices
- Historical chart data (7 days to 1 year)
- Volume and market cap
- Candlestick charts with OHLC data

### 📊 Demo Mode (No API Key)
- Uses realistic mock data
- All features work normally
- Perfect for testing and development
- No API calls made

---

## API Usage Tips

### Optimize Your API Calls

1. **Caching**: Data is cached for 1 minute automatically
2. **Manual Refresh**: Use the refresh button instead of page reload
3. **Demo Mode**: Switch to demo mode when not actively trading
4. **Rate Limits**: Free tier = 60 calls/minute (plenty for this app)

### Tracked Symbols

The app tracks these 12 stocks by default:
- AAPL (Apple)
- TSLA (Tesla)
- NVDA (NVIDIA)
- GOOGL (Google)
- MSFT (Microsoft)
- AMZN (Amazon)
- META (Meta/Facebook)
- AMC (AMC Entertainment)
- NFLX (Netflix)
- DIS (Disney)
- AMD (AMD)
- COIN (Coinbase)

### API Call Breakdown

**On Enable Real-Time:**
- Initial load: 12 calls (one per stock)
- Chart data: 1 call per stock when modal opens
- Auto-refresh: 12 calls every 60 seconds

**Total per hour:** ~720 calls (well within free tier)

---

## Troubleshooting

### "Cannot fetch data" Error
- ✅ Check your API key is correct
- ✅ Verify you have internet connection
- ✅ Check Finnhub status page
- ✅ Try demo mode as fallback

### Rate Limit Exceeded
- ✅ Wait 60 seconds for reset
- ✅ Switch to demo mode temporarily
- ✅ Reduce refresh frequency

### Charts Not Loading
- ✅ Check browser console for errors
- ✅ Verify API key has access to candle data
- ✅ Try different timeframe (1D, 7D, etc.)

---

## Alternative APIs

Want to use a different data provider? Easy to swap:

### Alpha Vantage
```javascript
// Free tier: 5 calls/minute, 500/day
const API_KEY = 'your_alpha_vantage_key';
const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
```

### Yahoo Finance (via RapidAPI)
```javascript
// Requires RapidAPI account
const url = `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}`;
```

### IEX Cloud
```javascript
// Free tier: 50,000 messages/month
const url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`;
```

---

## Security Best Practices

### ⚠️ Important: API Key Security

**For Development:**
- ✅ API key in source code is OK (it's a frontend app)
- ✅ Free tier has no sensitive data
- ✅ Rate limits protect your account

**For Production:**
- ✅ Use environment variables
- ✅ Implement backend proxy
- ✅ Add request throttling
- ✅ Monitor API usage

### Environment Variables (Production)

Create `.env` file:
```bash
VITE_FINNHUB_API_KEY=your_api_key_here
```

Update `stockService.js`:
```javascript
const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'demo';
```

---

## Need Help?

- 📖 [Finnhub Documentation](https://finnhub.io/docs/api)
- 💬 [GitHub Issues](https://github.com/your-repo/issues)
- 📧 Email: support@profitsignal.com

---

**Ready to go live?** Get your API key and start tracking real stocks! 🚀
