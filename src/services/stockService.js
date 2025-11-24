import axios from 'axios';
import { io } from 'socket.io-client';

// Backend API URL - Use environment variable or default to production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://profitpilot-server.onrender.com/api/stocks';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://profitpilot-server.onrender.com';

// Fallback to mock data if API fails
// Fallback to mock data if API fails
// import { mockStocks } from '../data/mockData';

// Stock symbols we're tracking
export const TRACKED_SYMBOLS = [
    'AAPL', 'TSLA', 'NVDA', 'GOOGL', 'MSFT',
    'AMZN', 'META', 'AMC', 'NFLX', 'DIS', 'AMD', 'COIN'
];

// Helper to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch real-time quote for a stock
 */
export const fetchStockQuote = async (symbol) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/quote`, {
            params: { symbol }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error.message);
        return null;
    }
};

/**
 * Fetch historical candle data for charts
 * @param {string} symbol - Stock symbol
 * @param {string} resolution - Chart resolution (15, 60, D, W, M)
 * @param {number} fromOrDaysBack - Either a timestamp (from) or number of days back
 * @param {number} to - Optional timestamp (to), if fromOrDaysBack is a timestamp
 */
export const fetchStockCandles = async (symbol, resolution = 'D', fromOrDaysBack = 30, to = null) => {
    try {
        let from, toTimestamp;

        // Check if fromOrDaysBack is a timestamp (from) or daysBack
        if (to !== null) {
            // Called with (symbol, resolution, from, to)
            from = fromOrDaysBack;
            toTimestamp = to;
        } else {
            // Called with (symbol, resolution, daysBack)
            toTimestamp = Math.floor(Date.now() / 1000);
            from = toTimestamp - (fromOrDaysBack * 24 * 60 * 60);
        }

        const response = await axios.get(`${API_BASE_URL}/candle`, {
            params: { symbol, resolution, from, to: toTimestamp }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching candles for ${symbol}:`, error.message);
        return null;
    }
};

/**
 * Fetch company profile
 */
export const fetchCompanyProfile = async (symbol) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/profile`, {
            params: { symbol }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching profile for ${symbol}:`, error.message);
        return null;
    }
};

/**
 * Search for stocks
 */
export const searchStocks = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: { q: query }
        });
        return response.data || [];
    } catch (error) {
        console.error(`Error searching stocks for ${query}:`, error.message);
        return [];
    }
};

/**
 * Analyze a single stock (get quote, profile, and AI signals)
 */
export const analyzeStock = async (symbol) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/analyze`, {
            params: { symbol }
        });
        return response.data;
    } catch (error) {
        console.error(`Error analyzing stock ${symbol}:`, error.message);
        return null;
    }
};

/**
 * Fetch all stock data with real-time updates and AI analysis
 */
export const fetchAllStocks = async () => {
    try {
        const stocks = [];

        // Process sequentially to avoid overwhelming the backend/Finnhub
        for (const symbol of TRACKED_SYMBOLS) {
            try {
                const response = await axios.get(`${API_BASE_URL}/analyze`, {
                    params: { symbol }
                });

                const data = response.data;
                // const mockStock = mockStocks.find(s => s.symbol === symbol) || {};

                // Fetch candles for trend if needed
                let trend = [];
                // We could fetch candles here if needed, but for speed we might skip or optimize
                // For now, let's keep using mock trend if real candles aren't fetched in analyze endpoint
                // (The analyze endpoint currently doesn't return trend/candles to save bandwidth)

                stocks.push({
                    ...data,
                    trend: trend // Keep mock trend or fetch real candles if critical
                });

            } catch (e) {
                console.error(`Failed to fetch analyzed stock ${symbol}`, e);
                // Fallback to mock - REMOVED
                // const mock = mockStocks.find(s => s.symbol === symbol);
                // if (mock) stocks.push(mock);
            }

            // Small delay
            await delay(100);
        }

        return stocks;
    } catch (error) {
        console.error('Error fetching all stocks:', error.message);
        return [];
    }
};

/**
 * WebSocket connection for real-time updates (via Backend Socket.io)
 */
export class StockWebSocket {
    constructor(onMessage) {
        this.socket = null;
        this.onMessage = onMessage;
        this.symbols = TRACKED_SYMBOLS;
    }

    connect() {
        if (this.socket) return;

        this.socket = io(SOCKET_URL);

        this.socket.on('connect', () => {
            console.log('Connected to Backend Socket.io');
            // Subscribe to symbols
            this.symbols.forEach(symbol => {
                this.socket.emit('subscribe', symbol);
            });
        });

        this.socket.on('stock-update', (data) => {
            if (this.onMessage) {
                this.onMessage(data);
            }
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from Backend Socket.io');
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export default {
    fetchStockQuote,
    fetchStockCandles,
    fetchCompanyProfile,
    fetchAllStocks,
    StockWebSocket
};


