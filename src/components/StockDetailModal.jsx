import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, Target, Shield, AlertTriangle } from 'lucide-react';
import { formatCurrency, formatPercent } from '../data/mockData';
import { fetchStockCandles } from '../services/stockService';
import AdvancedStockChart from './AdvancedStockChart';
import CandlestickChart from './CandlestickChart';

const StockDetailModal = ({ stock, isOpen, onClose }) => {
    const [chartType, setChartType] = useState('area'); // area, candlestick
    const [timeRange, setTimeRange] = useState('7D'); // 1D, 7D, 1M, 3M, 1Y
    const [chartData, setChartData] = useState([]);
    const [candleData, setCandleData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && stock) {
            loadChartData();
        }
    }, [isOpen, stock, timeRange]);

    const loadChartData = async () => {
        setLoading(true);
        try {
            const daysMap = {
                '1D': 1,
                '7D': 7,
                '1M': 30,
                '3M': 90,
                '1Y': 365
            };

            const days = daysMap[timeRange] || 7;
            const candles = await fetchStockCandles(stock.symbol, 'D', days);

            if (candles && candles.c && candles.c.length > 0) {
                // Format data for area chart
                const areaData = candles.c.map((close, index) => ({
                    value: close,
                    date: new Date(candles.t[index] * 1000).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    })
                }));
                setChartData(areaData);

                // Format data for candlestick chart
                const candleChartData = candles.c.map((close, index) => ({
                    date: new Date(candles.t[index] * 1000).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    }),
                    open: candles.o[index],
                    high: candles.h[index],
                    low: candles.l[index],
                    close: close,
                    volume: candles.v[index]
                }));
                setCandleData(candleChartData);
            } else {
                // Fallback to trend data
                const fallbackData = stock.trend.map((value, index) => ({
                    value,
                    date: `Day ${index + 1}`
                }));
                setChartData(fallbackData);
            }
        } catch (error) {
            console.error('Error loading chart data:', error);
            // Use fallback data
            const fallbackData = stock.trend.map((value, index) => ({
                value,
                date: `Day ${index + 1}`
            }));
            setChartData(fallbackData);
        } finally {
            setLoading(false);
        }
    };

    if (!stock) return null;

    const isPositive = stock.change >= 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="glass rounded-2xl p-6 max-w-4xl w-full border border-slate-200 dark:border-slate-700 my-8"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                        {stock.symbol}
                                    </h2>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${stock.signal === 'strong-buy' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' :
                                        stock.signal === 'buy' ? 'bg-blue-500/10 text-blue-500 border-blue-500/30' :
                                            stock.signal === 'sell' ? 'bg-orange-500/10 text-orange-500 border-orange-500/30' :
                                                'bg-red-500/10 text-red-500 border-red-500/30'
                                        }`}>
                                        {stock.signal === 'strong-buy' ? 'Strong Buy' :
                                            stock.signal === 'buy' ? 'Buy' :
                                                stock.signal === 'sell' ? 'Sell' : 'Strong Sell'}
                                    </span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400">{stock.name}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl glass hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Price Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Current Price</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {formatCurrency(stock.price)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Change</p>
                                <div className="flex items-center space-x-1">
                                    {isPositive ? (
                                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4 text-red-500" />
                                    )}
                                    <p className={`text-lg font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {formatPercent(stock.changePercent)}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Target Price</p>
                                <p className="text-lg font-semibold text-emerald-500">
                                    {formatCurrency(stock.targetPrice)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Win Rate</p>
                                <p className="text-lg font-semibold text-blue-500">
                                    {stock.winRate}%
                                </p>
                            </div>
                        </div>

                        {/* Chart Controls */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setChartType('area')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${chartType === 'area'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                        }`}
                                >
                                    Area
                                </button>
                                <button
                                    onClick={() => setChartType('candlestick')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${chartType === 'candlestick'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                        }`}
                                >
                                    Candlestick
                                </button>
                            </div>
                            <div className="flex space-x-2">
                                {['1D', '7D', '1M', '3M', '1Y'].map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${timeRange === range
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                            }`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="mb-6 bg-white/50 dark:bg-slate-800/50 rounded-xl p-4">
                            {loading ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                </div>
                            ) : (
                                <>
                                    {chartType === 'area' && (
                                        <AdvancedStockChart data={chartData} symbol={stock.symbol} height={300} />
                                    )}
                                    {chartType === 'candlestick' && (
                                        <CandlestickChart data={candleData} height={400} />
                                    )}
                                </>
                            )}
                        </div>

                        {/* Professional Advice Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="p-5 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Target className="w-5 h-5 text-blue-500" />
                                    <h3 className="font-bold text-slate-900 dark:text-white">Strategy & Targets</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Entry Zone</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                                            {formatCurrency(stock.price * 0.99)} - {formatCurrency(stock.price * 1.01)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Take Profit 1</span>
                                        <span className="text-sm font-bold text-emerald-500">
                                            {formatCurrency(stock.targetPrice)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Take Profit 2</span>
                                        <span className="text-sm font-bold text-emerald-500">
                                            {formatCurrency(stock.targetPrice * 1.05)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Shield className="w-5 h-5 text-orange-500" />
                                    <h3 className="font-bold text-slate-900 dark:text-white">Risk Management</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Stop Loss</span>
                                        <span className="text-sm font-bold text-red-500">
                                            {formatCurrency(stock.stopLoss)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Risk/Reward Ratio</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">1 : 2.5</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Volatility</span>
                                        <span className="text-sm font-bold text-orange-500">Medium</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AI Analysis */}
                        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                            <div className="flex items-center space-x-2 mb-2">
                                <AlertTriangle className="w-5 h-5 text-blue-500" />
                                <h3 className="font-bold text-slate-900 dark:text-white">Professional Analysis</h3>
                            </div>
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                {stock.signal === 'strong-buy' && (
                                    `${stock.symbol} is exhibiting strong bullish momentum confirmed by volume expansion. The stock has successfully tested support levels and is now breaking out. Our algorithms suggest a high probability (win rate: ${stock.winRate}%) of reaching the primary target of ${formatCurrency(stock.targetPrice)}. Recommended to accumulate positions with a strict stop loss at ${formatCurrency(stock.stopLoss)}.`
                                )}
                                {stock.signal === 'buy' && (
                                    `${stock.symbol} is showing positive divergence. While momentum is building, we recommend entering positions cautiously. The risk/reward profile is favorable with an upside potential to ${formatCurrency(stock.targetPrice)}. Maintain discipline with stop losses.`
                                )}
                                {stock.signal === 'sell' && (
                                    `${stock.symbol} is encountering significant resistance. Momentum indicators are rolling over, suggesting potential downside risk. We advise reducing exposure or tightening stops to ${formatCurrency(stock.stopLoss)} to protect capital.`
                                )}
                                {stock.signal === 'strong-sell' && (
                                    `CRITICAL WARNING: ${stock.symbol} has broken key support levels with increasing sell volume. The technical structure has deteriorated significantly. Immediate exit or hedging strategies are recommended to prevent further losses. Downside risk is elevated.`
                                )}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StockDetailModal;
