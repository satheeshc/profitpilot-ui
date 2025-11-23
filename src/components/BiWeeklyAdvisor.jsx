import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Target, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculatePortfolio, formatCurrency, formatPercent } from '../data/mockData';

const BiWeeklyAdvisor = ({ stocks }) => {
    const [budget, setBudget] = useState(500);
    const [portfolio, setPortfolio] = useState(null);

    useEffect(() => {
        const result = calculatePortfolio(budget, stocks);
        setPortfolio(result);
    }, [budget, stocks]);

    const handleBudgetChange = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setBudget(value);
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
        >
            <div className="glass rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold gradient-text">Bi-Weekly Advisor</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">AI-Powered Portfolio Recommendations</p>
                        </div>
                    </div>

                    <div className="relative min-w-[200px]">
                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
                            Investment Budget
                        </label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="number"
                                value={budget}
                                onChange={handleBudgetChange}
                                min="0"
                                step="50"
                                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Portfolio Summary */}
                {portfolio && (
                    <motion.div
                        key={budget}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                    >
                        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl p-4 border border-emerald-500/20">
                            <div className="flex items-center space-x-2 mb-2">
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm text-slate-500 dark:text-slate-400">Total Allocation</span>
                            </div>
                            <p className="text-2xl font-bold text-emerald-500">{formatCurrency(portfolio.totalInvested)}</p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-4 border border-blue-500/20">
                            <div className="flex items-center space-x-2 mb-2">
                                <Target className="w-4 h-4 text-blue-500" />
                                <span className="text-sm text-slate-500 dark:text-slate-400">Est. Monthly Return</span>
                            </div>
                            <p className="text-2xl font-bold text-blue-500">{formatCurrency(portfolio.totalProjectedProfit * 2)}</p>
                        </div>

                        <div className="bg-gradient-to-br from-slate-500/10 to-slate-500/5 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center space-x-2 mb-2">
                                <DollarSign className="w-4 h-4 text-slate-500" />
                                <span className="text-sm text-slate-500 dark:text-slate-400">Cash Reserve</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(portfolio.remainingBudget)}</p>
                        </div>
                    </motion.div>
                )}

                {/* Portfolio Table */}
                {portfolio && portfolio.portfolio.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Symbol</th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Price</th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Rec. Shares</th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Win Rate</th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Stop Loss</th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Total Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {portfolio.portfolio.map((item, index) => (
                                        <motion.tr
                                            key={item.symbol}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-100/30 dark:hover:bg-slate-800/30 transition-colors"
                                        >
                                            <td className="py-4 px-4">
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white">{item.symbol}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.name}</p>
                                                </div>
                                            </td>
                                            <td className="text-right py-4 px-4 font-semibold text-slate-900 dark:text-white">{formatCurrency(item.price)}</td>
                                            <td className="text-right py-4 px-4">
                                                <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm font-bold">
                                                    {item.recommendedShares}
                                                </span>
                                            </td>
                                            <td className="text-right py-4 px-4">
                                                <span className="text-emerald-500 font-bold">{item.winRate}%</span>
                                            </td>
                                            <td className="text-right py-4 px-4 font-medium text-red-500">
                                                {formatCurrency(item.stopLoss)}
                                            </td>
                                            <td className="text-right py-4 px-4 font-bold text-slate-900 dark:text-white">{formatCurrency(item.totalCost)}</td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                )}

                {portfolio && portfolio.portfolio.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-slate-500 dark:text-slate-400">No suitable stocks found for this budget allocation.</p>
                    </div>
                )}
            </div>
        </motion.section>
    );
};

export default BiWeeklyAdvisor;
