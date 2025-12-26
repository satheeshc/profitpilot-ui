import React from 'react';
import { TrendingUp, TrendingDown, Target, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency, formatPercent } from '../data/mockData';

const MarketPulse = ({ stocks }) => {
    const strongBuyStocks = stocks.filter(s => s.signal === 'strong-buy');
    const strongSellStocks = stocks.filter(s => s.signal === 'strong-sell');

    const StockItem = ({ stock, type }) => {
        const isGreen = type === 'buy';

        return (
            <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className={`p-4 rounded-xl border transition-all ${isGreen
                    ? 'bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/50'
                    : 'bg-gradient-to-r from-red-500/10 to-red-500/5 border-red-500/30 hover:border-red-500/50'
                    }`}
            >
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white" title={stock.name}>{stock.symbol}</h4>
                            {isGreen && (
                                <Award className="w-4 h-4 text-emerald-500" />
                            )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{stock.name}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg text-slate-900 dark:text-white">{formatCurrency(stock.price)}</p>
                        <p className={`text-sm font-semibold ${isGreen ? 'text-emerald-500' : 'text-red-500'}`}>
                            {formatPercent(stock.changePercent)}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {isGreen ? (
                        <>
                            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-2">
                                <div className="flex items-center space-x-1 mb-1">
                                    <Target className="w-3 h-3 text-emerald-500" />
                                    <span className="text-xs text-slate-500 dark:text-slate-400">Win Rate</span>
                                </div>
                                <p className="text-sm font-bold text-emerald-500">{stock.winRate}%</p>
                            </div>
                            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-2">
                                <div className="flex items-center space-x-1 mb-1">
                                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                                    <span className="text-xs text-slate-500 dark:text-slate-400">Target</span>
                                </div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(stock.targetPrice)}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-2">
                                <div className="flex items-center space-x-1 mb-1">
                                    <Shield className="w-3 h-3 text-red-500" />
                                    <span className="text-xs text-slate-500 dark:text-slate-400">Stop Loss</span>
                                </div>
                                <p className="text-sm font-bold text-red-500">{formatCurrency(stock.stopLoss)}</p>
                            </div>
                            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-2">
                                <div className="flex items-center space-x-1 mb-1">
                                    <TrendingDown className="w-3 h-3 text-red-500" />
                                    <span className="text-xs text-slate-500 dark:text-slate-400">Risk</span>
                                </div>
                                <p className="text-sm font-bold text-red-500">High</p>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        );
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Market Pulse</h2>
                <p className="text-slate-500 dark:text-slate-400">Real-time signals for optimal trading decisions</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Strong Buy Column */}
                <div className="glass rounded-2xl p-6 border border-emerald-500/30">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-emerald-500">Strong Buy Signals</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">High momentum stocks</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {strongBuyStocks.length > 0 ? (
                            strongBuyStocks.map((stock, index) => (
                                <motion.div
                                    key={stock.symbol}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <StockItem stock={stock} type="buy" />
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-center text-slate-500 dark:text-slate-400 py-8">No strong buy signals</p>
                        )}
                    </div>
                </div>

                {/* Strong Sell Column */}
                <div className="glass rounded-2xl p-6 border border-red-500/30">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                            <TrendingDown className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-red-500">Strong Sell Signals</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Downward momentum stocks</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {strongSellStocks.length > 0 ? (
                            strongSellStocks.map((stock, index) => (
                                <motion.div
                                    key={stock.symbol}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <StockItem stock={stock} type="sell" />
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-center text-slate-500 dark:text-slate-400 py-8">No strong sell signals</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default MarketPulse;
