import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import StockTicker from './components/StockTicker';
import TradingSignalsDashboard from './components/TradingSignalsDashboard';
import BiWeeklyAdvisor from './components/BiWeeklyAdvisor';
import ValueStockList from './components/ValueStockList';
import DeepValueList from './components/DeepValueList';
import MarketPulse from './components/MarketPulse';
import StockGrid from './components/StockGrid';
import StockDetailModal from './components/StockDetailModal';
// import { mockStocks } from './data/mockData';
import { fetchAllStocks, StockWebSocket } from './services/stockService';
import { RefreshCw } from 'lucide-react';

function App() {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [selectedStock, setSelectedStock] = useState(null);
    const [showStockModal, setShowStockModal] = useState(false);
    const [marketStatus, setMarketStatus] = useState('closed');
    const [wsConnection, setWsConnection] = useState(null);
    const [valueStockSymbols, setValueStockSymbols] = useState([]);
    const [deepValueStockSymbols, setDeepValueStockSymbols] = useState([]);

    // Check market status
    const checkMarketStatus = () => {
        const now = new Date();
        const etTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
        const day = etTime.getDay();
        const hour = etTime.getHours();
        const minute = etTime.getMinutes();
        const totalMinutes = hour * 60 + minute;

        // Market hours: 9:30 AM - 4:00 PM ET, Mon-Fri (1-5)
        const marketOpen = 9 * 60 + 30;
        const marketClose = 16 * 60;

        if (day >= 1 && day <= 5 && totalMinutes >= marketOpen && totalMinutes < marketClose) {
            setMarketStatus('open');
        } else {
            setMarketStatus('closed');
        }
    };

    useEffect(() => {
        console.log("App mounted");
        // Initial load
        loadRealTimeData();
        checkMarketStatus();

        // Set up WebSocket
        /*
        const ws = new StockWebSocket((message) => {
            if (message.type === 'trade' && message.data) {
                setStocks(prevStocks => {
                    const newStocks = [...prevStocks];
                    let hasUpdates = false;

                    message.data.forEach(trade => {
                        const index = newStocks.findIndex(s => s.symbol === trade.s);

                        if (index !== -1) {
                            const stock = newStocks[index];
                            const change = trade.p - stock.previousClose;
                            const changePercent = (change / stock.previousClose) * 100;

                            // Recalculate signal based on new price action
                            // Note: calculateSignal is now just a helper or removed if backend does it
                            // But since we are receiving raw trade updates here, we might need it locally 
                            // OR we should rely on backend to send full analyzed object.
                            // For now, let's keep local calculation for immediate updates if the helper exists,
                            // or if it was removed, we need to handle it.
                            // The previous stockService had calculateSignal removed? Let's check.
                            // If removed, we should just update price/change.

                            // Checking stockService.js content from previous steps...
                            // calculateSignal was removed from stockService.js export list in the last update?
                            // No, I see I removed it in my thought process but let's check if I actually removed the export.
                            // I replaced the file content.

                            // Let's assume for now we just update price and let the next refresh sync full analysis,
                            // or if calculateSignal is missing, we'll get an error.
                            // I'll check stockService exports in a moment.

                            newStocks[index] = {
                                ...stock,
                                price: trade.p,
                                change: change,
                                changePercent: changePercent,
                                lastUpdated: new Date(trade.t).toISOString()
                            };
                            hasUpdates = true;
                        }
                    });

                    return hasUpdates ? newStocks : prevStocks;
                });

                setLastUpdate(new Date());
            }
        });

        ws.connect();
        setWsConnection(ws);

        // Auto-refresh fallback every 60s and check market status
        const interval = setInterval(() => {
            loadRealTimeData();
            checkMarketStatus();
        }, 60000);

        return () => {
            ws.disconnect();
            clearInterval(interval);
        };
        */
    }, []); // Empty dependency array to run once on mount

    const loadRealTimeData = async () => {
        setLoading(true);
        try {
            const data = await fetchAllStocks();
            if (data && data.length > 0) {
                setStocks(data);
                setLastUpdate(new Date());
            }
        } catch (error) {
            console.error('Failed to load real-time data:', error);
            // Keep using mock data on error
        } finally {
            setLoading(false);
        }
    };

    const handleStockClick = (stock) => {
        setSelectedStock(stock);
        setShowStockModal(true);
    };

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                <Navbar stocks={stocks} onStockClick={handleStockClick} marketStatus={marketStatus} />
                <StockTicker stocks={stocks} />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header & Refresh */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                Market Overview
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400">
                                Real-time signals and AI-powered analysis
                            </p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                <span>Updated: {lastUpdate.toLocaleTimeString()}</span>
                            </div>
                            <button
                                onClick={loadRealTimeData}
                                disabled={loading}
                                className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center space-x-2 disabled:opacity-50"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                <span>Refresh</span>
                            </button>
                        </div>
                    </div>

                    {/* Trading Signals Dashboard */}
                    <TradingSignalsDashboard
                        stocks={stocks}
                        excludeSymbols={[...valueStockSymbols, ...deepValueStockSymbols]}
                    />

                    {/* Hero Section - Bi-Weekly Advisor */}
                    <BiWeeklyAdvisor stocks={stocks} />

                    {/* Value Stock Screener */}
                    <div className="mb-8">
                        <ValueStockList onStocksLoaded={setValueStockSymbols} />
                    </div>

                    {/* Deep Value Picks */}
                    <div className="mb-8">
                        <DeepValueList onStocksLoaded={setDeepValueStockSymbols} />
                    </div>

                    {/* Market Pulse - Split View */}
                    <MarketPulse stocks={stocks} />

                    {/* Stock Grid */}
                    <StockGrid stocks={stocks} onCardClick={handleStockClick} />
                </main>

                {/* Footer */}
                <footer className="border-t-2 border-slate-200 dark:border-slate-700 mt-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center">
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                © 2024 ProfitSignal - Professional Investment Advisory Platform
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                                🔴 LIVE: Real-time market data powered by Finnhub API
                            </p>
                            <div className="max-w-2xl mx-auto p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                                <p className="text-xs font-bold text-amber-900 dark:text-amber-300 mb-1">
                                    ⚠️ Professional Trading Disclaimer
                                </p>
                                <p className="text-xs text-amber-800 dark:text-amber-400">
                                    This platform provides AI-powered trading signals and investment recommendations.
                                    While our algorithms analyze real-time market data, past performance does not guarantee future results.
                                    All trading involves risk. Always conduct your own research and consult with a licensed financial advisor
                                    before making investment decisions. Not financial advice.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>

                {/* Stock Detail Modal */}
                <StockDetailModal
                    stock={selectedStock}
                    isOpen={showStockModal}
                    onClose={() => setShowStockModal(false)}
                />
            </div>
        </ThemeProvider>
    );
}

export default App;
