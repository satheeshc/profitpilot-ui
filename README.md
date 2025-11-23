# 🚀 ProfitSignal - AI Investment Advisor & Market Dashboard

## ✨ **ENHANCED VERSION with Real-Time Data, Advanced Charts & Portfolio Tracking**

A stunning, production-ready fintech web application built with React, Tailwind CSS, Framer Motion, and Recharts. ProfitSignal provides AI-powered investment recommendations, **real-time market data**, **advanced charting**, and **comprehensive portfolio tracking**.

![ProfitSignal](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.17-cyan)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 **NEW FEATURES**

### 1. **Real-Time Stock Data Integration** 🔴 LIVE
- ✅ **Finnhub API Integration**: Real-time stock quotes and market data
- ✅ **WebSocket Support**: Live price updates (60 calls/minute on free tier)
- ✅ **Smart Caching**: 1-minute cache to optimize API usage
- ✅ **Auto-Refresh**: Updates every 60 seconds when enabled
- ✅ **Fallback System**: Gracefully falls back to mock data if API fails
- ✅ **Toggle Control**: Switch between demo mode and real-time data

### 2. **Advanced Chart Types** 📊
- ✅ **Area Charts**: Smooth gradient-filled price charts
- ✅ **Candlestick Charts**: OHLC (Open-High-Low-Close) with volume bars
- ✅ **Multiple Timeframes**: 1D, 7D, 1M, 3M, 1Y views
- ✅ **Interactive Tooltips**: Detailed price information on hover
- ✅ **Responsive Design**: Charts adapt to all screen sizes
- ✅ **Color-Coded Trends**: Green for gains, red for losses

### 3. **Portfolio Tracking** 💼
- ✅ **Buy/Sell Functionality**: Add and remove stocks from your portfolio
- ✅ **Position Management**: Track shares, average price, and current value
- ✅ **Gain/Loss Calculation**: Real-time profit/loss tracking
- ✅ **Transaction History**: Complete record of all trades
- ✅ **Watchlist**: Save stocks for later monitoring
- ✅ **CSV Export**: Download transaction history
- ✅ **LocalStorage Persistence**: Your data is saved automatically
- ✅ **Portfolio Statistics**: Total value, cost, gain/loss, and return %

---

## 🌟 **Core Features**

### **Bi-Weekly Advisor** (Hero Section)
- Interactive budget input with real-time calculations
- AI-powered stock recommendations based on "Strong Buy" signals
- Dynamic portfolio allocation showing shares, costs, and projected profits
- Summary cards for total investment, projected profit, and remaining budget

### **Market Pulse** (Split View)
- **Strong Buy Signals** (Green): High momentum stocks with win rates and targets
- **Strong Sell Signals** (Red): Downward momentum stocks with stop loss data
- Visual distinction with colored gradients and trend indicators

### **Stock Ticker View** (Grid)
- 12 popular US stocks: AAPL, TSLA, NVDA, GOOGL, MSFT, AMZN, META, AMC, NFLX, DIS, AMD, COIN
- Real-time price updates when enabled
- Signal badges: Strong Buy, Buy, Sell, Strong Sell
- Mini sparkline charts showing price trends
- Click any card to open detailed modal with advanced charts

### **Stock Detail Modal**
- Full-screen modal with comprehensive stock information
- Switch between Area and Candlestick charts
- Multiple timeframe options (1D to 1Y)
- AI-powered analysis and recommendations
- Add to watchlist with one click
- Current price, change, target price, and win rate

### **Portfolio Dashboard**
- **Portfolio Tab**: View all your positions with real-time P&L
- **Watchlist Tab**: Track stocks you're interested in
- **Transactions Tab**: Complete history of all trades
- **Quick Actions**: One-click buy for top Strong Buy stocks
- **Export Functionality**: Download transactions as CSV
- **Clear Portfolio**: Reset all data with confirmation

---

## 🛠️ **Tech Stack**

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | 19.2.0 |
| **Build Tool** | Vite | 7.2.4 |
| **Styling** | Tailwind CSS | 4.1.17 |
| **Charts** | Recharts | 3.4.1 |
| **Icons** | Lucide React | 0.554.0 |
| **Animation** | Framer Motion | Latest |
| **HTTP Client** | Axios | Latest |
| **API** | Finnhub | Free Tier |

---

## 📦 **Installation & Setup**

### **Prerequisites**
- Node.js 18+ and npm
- (Optional) Finnhub API key for real-time data

### **Step 1: Clone & Install**
```bash
git clone <repository-url>
cd profitsignal/ui
npm install
```

### **Step 2: Configure API (Optional)**
To enable real-time data, get a free API key from [Finnhub](https://finnhub.io/register):

1. Sign up at https://finnhub.io/register
2. Copy your API key
3. Open `src/services/stockService.js`
4. Replace `'demo'` with your actual API key:
```javascript
const FINNHUB_API_KEY = 'your_api_key_here';
```

### **Step 3: Start Development Server**
```bash
npm run dev
```

Open http://localhost:5173/ in your browser.

---

## 🎮 **How to Use**

### **1. Portfolio Management**
1. **Add Stocks**: Click "Quick Actions" buttons or click any stock card
2. **Buy Shares**: Enter quantity and click "Buy Now"
3. **Track Performance**: View real-time gain/loss in Portfolio tab
4. **Sell Shares**: Click "Sell" button in portfolio table
5. **Export Data**: Click "Export" to download CSV

### **2. Watchlist**
1. Click the eye icon on any stock card
2. View all watched stocks in the Watchlist tab
3. Quick buy from watchlist cards

### **3. Real-Time Data**
1. Click "Enable Real-Time" button at the top
2. Data refreshes automatically every 60 seconds
3. Manual refresh available with "Refresh" button
4. Toggle back to demo mode anytime

### **4. Advanced Charts**
1. Click any stock card to open detail modal
2. Switch between Area and Candlestick charts
3. Select timeframe: 1D, 7D, 1M, 3M, or 1Y
4. Read AI analysis for trading insights

---

## 📁 **Project Structure**

```
src/
├── components/
│   ├── Navbar.jsx                  # Navigation with theme toggle
│   ├── BiWeeklyAdvisor.jsx         # Budget calculator
│   ├── MarketPulse.jsx             # Buy/Sell signals
│   ├── StockGrid.jsx               # Stock grid layout
│   ├── StockCard.jsx               # Individual stock cards
│   ├── MiniSparkline.jsx           # Mini trend charts
│   ├── PortfolioDashboard.jsx      # Portfolio management
│   ├── StockDetailModal.jsx        # Stock detail popup
│   ├── AdvancedStockChart.jsx      # Area chart component
│   └── CandlestickChart.jsx        # Candlestick chart
├── context/
│   ├── ThemeContext.jsx            # Dark/light mode
│   └── PortfolioContext.jsx        # Portfolio state management
├── services/
│   └── stockService.js             # Finnhub API integration
├── data/
│   └── mockData.js                 # Mock data & utilities
├── App.jsx                         # Main application
├── main.jsx                        # React entry point
└── index.css                       # Global styles
```

---

## 💡 **API Integration Details**

### **Finnhub API Endpoints Used**
1. **Quote** (`/quote`): Real-time stock prices
2. **Candles** (`/stock/candle`): Historical OHLC data
3. **Profile** (`/stock/profile2`): Company information
4. **WebSocket** (`wss://ws.finnhub.io`): Live price updates

### **Rate Limits (Free Tier)**
- **REST API**: 60 calls/minute
- **WebSocket**: 1 connection, unlimited messages
- **Caching**: 1-minute cache reduces API calls

### **Signal Calculation**
```javascript
if (changePercent >= 2.5) → Strong Buy
if (changePercent >= 0.5) → Buy
if (changePercent <= -2.5) → Strong Sell
if (changePercent <= -0.5) → Sell
```

---

## 🎨 **Design Features**

### **Visual Effects**
- ✨ Glassmorphism with backdrop blur
- 🌈 Gradient text and backgrounds
- 🎭 Smooth Framer Motion animations
- 💫 Hover effects with elevation changes
- 🔄 Pulse animations for live indicators

### **Color Palette**

**Light Mode:**
- Background: Slate 50 (#f8fafc)
- Cards: White (#ffffff)
- Primary: Emerald 500 (#10b981)
- Secondary: Red 500 (#ef4444)
- Accent: Blue 500 (#3b82f6)

**Dark Mode:**
- Background: Slate 900 (#0f172a)
- Cards: Slate 800 (#1e293b)
- Primary: Emerald 500 (#10b981)
- Secondary: Red 500 (#ef4444)
- Accent: Blue 500 (#3b82f6)

---

## 📊 **Portfolio Tracking Features**

### **Statistics Calculated**
- Total Portfolio Value (current market value)
- Total Cost Basis (average purchase price × shares)
- Total Gain/Loss (value - cost)
- Percentage Return ((gain/loss / cost) × 100)
- Position Count (number of different stocks)

### **Transaction Types**
- **Buy**: Add shares to portfolio
- **Sell**: Remove shares from portfolio
- **History**: Complete audit trail with timestamps

### **Data Persistence**
All data is saved to browser localStorage:
- `profitsignal-portfolio`: Your stock positions
- `profitsignal-watchlist`: Watched stocks
- `profitsignal-transactions`: Trade history
- `profitsignal-theme`: Dark/light mode preference

---

## 🚀 **Performance Optimizations**

1. **API Caching**: 1-minute cache for quotes and candles
2. **Lazy Loading**: Charts load on-demand when modal opens
3. **Debounced Updates**: Prevents excessive re-renders
4. **Memoization**: React.memo for expensive components
5. **Code Splitting**: Dynamic imports for large components

---

## 📱 **Responsive Breakpoints**

- **Mobile**: < 768px (1 column, stacked layout)
- **Tablet**: 768px - 1024px (2 columns)
- **Laptop**: 1024px - 1280px (3 columns)
- **Desktop**: > 1280px (4 columns)

---

## 🔧 **Available Scripts**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🎯 **Future Enhancements**

- [ ] User authentication & cloud sync
- [ ] More chart types (Line, Bar, Pie)
- [ ] Technical indicators (RSI, MACD, Bollinger Bands)
- [ ] News feed integration
- [ ] Price alerts via email/SMS
- [ ] Multi-currency support
- [ ] Options & crypto tracking
- [ ] Social trading features
- [ ] Mobile app (React Native)

---

## ⚠️ **Important Disclaimers**

**This application is for educational and demonstration purposes.**

- ✋ **NOT Financial Advice**: This is a demo application
- 📊 **Mock Data Available**: Can run without real API
- 🔑 **API Key Required**: For real-time data (free tier available)
- 💰 **No Real Trading**: This is a tracking tool only
- 📚 **Do Your Research**: Always consult professionals before investing

---

## 🤝 **Contributing**

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 **License**

MIT License - feel free to use this project for learning and demonstration.

---

## 🙏 **Acknowledgments**

- **Finnhub**: Real-time stock data API
- **Recharts**: Beautiful React charting library
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide**: Icon library

---

## 📞 **Support**

For questions or issues:
- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

**Built with ❤️ using React, Tailwind CSS, Recharts, and Framer Motion**

*ProfitSignal - Your AI-Powered Investment Companion with Real-Time Data & Portfolio Tracking*

---

## 🎬 **Screenshots**

### Portfolio Dashboard
![Portfolio Dashboard](screenshots/portfolio.png)

### Stock Detail Modal with Charts
![Stock Charts](screenshots/charts.png)

### Market Pulse
![Market Pulse](screenshots/market-pulse.png)

### Dark Mode
![Dark Mode](screenshots/dark-mode.png)

---

**Last Updated**: November 2024  
**Version**: 2.0.0 (Enhanced with Real-Time Data & Portfolio Tracking)
