import React, { useState } from 'react';
import SignalListModal from './SignalListModal';
import InfoModal from './InfoModal';
import { TrendingUp, TrendingDown, Target, Shield, Award, Zap, AlertCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency, formatPercent } from '../data/mockData';

const TradingSignalsDashboard = ({ stocks }) => {
    const strongBuyStocks = stocks.filter(s => s.signal === 'strong-buy');
    const strongSellStocks = stocks.filter(s => s.signal === 'strong-sell');
    const buyStocks = stocks.filter(s => s.signal === 'buy');
    const sellStocks = stocks.filter(s => s.signal === 'sell');

    const avgWinRate = stocks.length > 0 ? stocks.reduce((sum, s) => sum + s.winRate, 0) / stocks.length : 0;
    const topPerformer = stocks.length > 0 ? [...stocks].sort((a, b) => b.changePercent - a.changePercent)[0] : null;
    const worstPerformer = stocks.length > 0 ? [...stocks].sort((a, b) => a.changePercent - b.changePercent)[0] : null;

    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, title: '', data: [] });

    const handleOpenModal = (type, title, data) => {
        setModalConfig({
            isOpen: true,
            type,
            title,
            data
        });
    };

    const handleCloseModal = () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
    };

    const [infoModalOpen, setInfoModalOpen] = useState(false);

    const winRateExplanation = (
        <div className="space-y-4">
            <p>
                The <strong>Average Win Rate</strong> represents the historical probability of success for the current active signals based on our AI's backtesting data.
            </p>
            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">How it works:</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>
                        <strong>Historical Analysis:</strong> For every signal generated, our algorithm looks back at similar market conditions in the past 20 years.
                    </li>
                    <li>
                        <strong>Success Metric:</strong> A signal is considered a 'win' if it reached its profit target before hitting the stop-loss level.
                    </li>
                    <li>
                        <strong>Calculation:</strong> The percentage shows the average success rate of all currently active signals combined.
                    </li>
                </ul>
            </div>
            <p className="text-sm italic bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                A higher win rate indicates higher confidence in the current set of signals based on historical performance.
            </p>
        </div>
    );

    const SignalCard = ({ title, stocks, color, icon: Icon, bgColor, borderColor }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${bgColor} rounded-2xl p-6 border-2 ${borderColor} shadow-xl`}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${color === 'emerald' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className={`text-2xl font-black ${color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                            {title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">
                            {stocks.length} Active Signal{stocks.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
                <div className={`text-5xl font-black ${color === 'emerald' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {stocks.length}
                </div>
            </div>

            <div className="space-y-3">
                {stocks.slice(0, 3).map((stock, idx) => (
                    <div
                        key={stock.symbol}
                        className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h4 className="text-lg font-black text-slate-900 dark:text-white">{stock.symbol}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{stock.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-black text-slate-900 dark:text-white">{formatCurrency(stock.price)}</p>
                                <p className={`text-sm font-bold ${stock.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {formatPercent(stock.changePercent)}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-3">
                            <div className="bg-emerald-500/10 rounded-lg p-2">
                                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Target</p>
                                <p className="text-sm font-black text-emerald-700 dark:text-emerald-300">{formatCurrency(stock.targetPrice)}</p>
                            </div>
                            <div className="bg-red-500/10 rounded-lg p-2">
                                <p className="text-xs text-red-600 dark:text-red-400 font-semibold">Stop</p>
                                <p className="text-sm font-black text-red-700 dark:text-red-300">{formatCurrency(stock.stopLoss)}</p>
                            </div>
                            <div className="bg-amber-500/10 rounded-lg p-2">
                                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Win Rate</p>
                                <p className="text-sm font-black text-amber-700 dark:text-amber-300">{stock.winRate}%</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {stocks.length > 3 && (
                <div className="mt-4 text-center">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                        +{stocks.length - 3} more {title.toLowerCase()} signals
                    </p>
                </div>
            )}
        </motion.div>
    );

    return (
        <div className="mb-8">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                    <Zap className="w-8 h-8 text-amber-500" />
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white">
                        Live Trading Signals
                    </h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                    Real-time AI-powered buy and sell recommendations
                </p>
            </div>

            {/* Market Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleOpenModal('buy', 'Buy Signals', [...strongBuyStocks, ...buyStocks])}
                    className="glass rounded-xl p-4 border-2 border-emerald-500 shadow-lg cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors"
                >
                    <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Buy Signals</p>
                    </div>
                    <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                        {strongBuyStocks.length + buyStocks.length}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => handleOpenModal('sell', 'Sell Signals', [...strongSellStocks, ...sellStocks])}
                    className="glass rounded-xl p-4 border-2 border-red-500 shadow-lg cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                >
                    <div className="flex items-center space-x-2 mb-2">
                        <TrendingDown className="w-5 h-5 text-red-500" />
                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Sell Signals</p>
                    </div>
                    <p className="text-3xl font-black text-red-600 dark:text-red-400">
                        {strongSellStocks.length + sellStocks.length}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-xl p-4 border-2 border-amber-500 shadow-lg"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <Award className="w-5 h-5 text-amber-500" />
                            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Avg Win Rate</p>
                        </div>
                        <button
                            onClick={() => setInfoModalOpen(true)}
                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                        >
                            <Info className="w-4 h-4 text-slate-400 hover:text-blue-500" />
                        </button>
                    </div>
                    <p className="text-3xl font-black text-amber-600 dark:text-amber-400">
                        {avgWinRate.toFixed(0)}%
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass rounded-xl p-4 border-2 border-blue-500 shadow-lg"
                >
                    <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-blue-500" />
                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Top Mover</p>
                    </div>
                    <p className="text-xl font-black text-blue-600 dark:text-blue-400">
                        {topPerformer ? topPerformer.symbol : '-'}
                    </p>
                    <p className="text-sm font-bold text-emerald-500">
                        {topPerformer ? formatPercent(topPerformer.changePercent) : '-'}
                    </p>
                </motion.div>
            </div>

            {/* Strong Buy and Strong Sell Signals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SignalCard
                    title="STRONG BUY"
                    stocks={strongBuyStocks}
                    color="emerald"
                    icon={TrendingUp}
                    bgColor="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30"
                    borderColor="border-emerald-500"
                />

                <SignalCard
                    title="STRONG SELL"
                    stocks={strongSellStocks}
                    color="red"
                    icon={TrendingDown}
                    bgColor="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30"
                    borderColor="border-red-500"
                />
            </div>

            {/* Professional Disclaimer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 bg-amber-500/10 border-2 border-amber-500/30 rounded-xl"
            >
                <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-amber-900 dark:text-amber-300 mb-1">
                            Professional Investment Advisory
                        </p>
                        <p className="text-xs text-amber-800 dark:text-amber-400">
                            These signals are generated using advanced AI algorithms and technical analysis.
                            Past performance does not guarantee future results. Always conduct your own research
                            and consult with a licensed financial advisor before making investment decisions.
                        </p>
                    </div>
                </div>
            </motion.div>

            <SignalListModal
                isOpen={modalConfig.isOpen}
                onClose={handleCloseModal}
                title={modalConfig.title}
                stocks={modalConfig.data}
                type={modalConfig.type}
            />

            <InfoModal
                isOpen={infoModalOpen}
                onClose={() => setInfoModalOpen(false)}
                title="Understanding Win Rate"
                content={winRateExplanation}
            />
        </div >
    );
};

export default TradingSignalsDashboard;
