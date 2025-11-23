import React from 'react';
import { TrendingUp, TrendingDown, Target, Shield, Award, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency, formatPercent } from '../data/mockData';
import MiniSparkline from './MiniSparkline';

const StockCard = ({ stock, index, onCardClick }) => {
    const isPositive = stock.change >= 0;
    const riskRewardRatio = ((stock.targetPrice - stock.price) / (stock.price - stock.stopLoss)).toFixed(2);

    const signalConfig = {
        'strong-buy': {
            bg: 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/20',
            border: 'border-emerald-500',
            text: 'STRONG BUY',
            textColor: 'text-emerald-500',
            icon: '🚀',
            glow: 'shadow-emerald-500/20'
        },
        'buy': {
            bg: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20',
            border: 'border-blue-500',
            text: 'BUY',
            textColor: 'text-blue-500',
            icon: '📈',
            glow: 'shadow-blue-500/20'
        },
        'sell': {
            bg: 'bg-gradient-to-br from-orange-500/20 to-orange-600/20',
            border: 'border-orange-500',
            text: 'SELL',
            textColor: 'text-orange-500',
            icon: '📉',
            glow: 'shadow-orange-500/20'
        },
        'strong-sell': {
            bg: 'bg-gradient-to-br from-red-500/20 to-red-600/20',
            border: 'border-red-500',
            text: 'STRONG SELL',
            textColor: 'text-red-500',
            icon: '⚠️',
            glow: 'shadow-red-500/20'
        },
        'hold': {
            bg: 'bg-gradient-to-br from-slate-500/20 to-slate-600/20',
            border: 'border-slate-500',
            text: 'HOLD',
            textColor: 'text-slate-500',
            icon: '⏸️',
            glow: 'shadow-slate-500/20'
        }
    };

    const config = signalConfig[stock.signal] || signalConfig['hold'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
            onClick={() => onCardClick && onCardClick(stock)}
            className={`glass rounded-2xl p-6 border-2 ${config.border} card-hover cursor-pointer shadow-xl ${config.glow} relative overflow-hidden`}
        >
            {/* Signal Badge - Top Right */}
            <div className={`absolute top-0 right-0 ${config.bg} px-4 py-2 rounded-bl-2xl border-l-2 border-b-2 ${config.border}`}>
                <div className="flex items-center space-x-2">
                    <span className="text-lg">{config.icon}</span>
                    <span className={`text-xs font-black tracking-wider ${config.textColor}`}>
                        {config.text}
                    </span>
                </div>
            </div>

            {/* Header */}
            <div className="mb-4 pr-24">
                <h3 className="text-2xl font-black mb-1 text-slate-900 dark:text-white tracking-tight">{stock.symbol}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 font-medium">{stock.name}</p>
            </div>

            {/* Price Section */}
            <div className="mb-4">
                <div className="flex items-baseline space-x-3 mb-2">
                    <p className="text-4xl font-black text-slate-900 dark:text-white">{formatCurrency(stock.price)}</p>
                    <div className="flex items-center space-x-1">
                        {isPositive ? (
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                        ) : (
                            <TrendingDown className="w-5 h-5 text-red-500" />
                        )}
                        <span className={`text-lg font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                            {formatPercent(stock.changePercent)}
                        </span>
                    </div>
                </div>
                <p className={`text-sm font-semibold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {isPositive ? '+' : ''}{formatCurrency(stock.change)} today
                </p>
            </div>

            {/* Sparkline */}
            <div className="mb-5 -mx-2 h-16">
                <MiniSparkline
                    data={stock.trend}
                    color={isPositive ? '#10b981' : '#ef4444'}
                />
            </div>

            {/* Trading Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Target Price */}
                <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/30">
                    <div className="flex items-center space-x-1 mb-1">
                        <Target className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Target</span>
                    </div>
                    <p className="text-sm font-black text-emerald-700 dark:text-emerald-300">{formatCurrency(stock.targetPrice)}</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-0.5">
                        +{((stock.targetPrice - stock.price) / stock.price * 100).toFixed(1)}%
                    </p>
                </div>

                {/* Stop Loss */}
                <div className="bg-red-500/10 rounded-xl p-3 border border-red-500/30">
                    <div className="flex items-center space-x-1 mb-1">
                        <Shield className="w-3.5 h-3.5 text-red-500" />
                        <span className="text-xs font-semibold text-red-600 dark:text-red-400">Stop Loss</span>
                    </div>
                    <p className="text-sm font-black text-red-700 dark:text-red-300">{formatCurrency(stock.stopLoss)}</p>
                    <p className="text-xs text-red-600 dark:text-red-500 mt-0.5">
                        -{((stock.price - stock.stopLoss) / stock.price * 100).toFixed(1)}%
                    </p>
                </div>
            </div>

            {/* Win Rate & Risk/Reward */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t-2 border-slate-200 dark:border-slate-700">
                {/* Win Rate */}
                <div>
                    <div className="flex items-center space-x-1 mb-1">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Win Rate</span>
                    </div>
                    <div className="flex items-baseline space-x-1">
                        <p className="text-xl font-black text-slate-900 dark:text-white">{stock.winRate}%</p>
                        <div className={`w-2 h-2 rounded-full ${stock.winRate >= 80 ? 'bg-emerald-500' : stock.winRate >= 60 ? 'bg-amber-500' : 'bg-red-500'} pulse-glow`}></div>
                    </div>
                </div>

                {/* Risk/Reward Ratio */}
                <div>
                    <div className="flex items-center space-x-1 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">R/R Ratio</span>
                    </div>
                    <p className="text-xl font-black text-blue-600 dark:text-blue-400">1:{riskRewardRatio}</p>
                </div>
            </div>

            {/* Live Indicator */}
            <div className="absolute bottom-3 right-3 flex items-center space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-glow"></div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">LIVE</span>
            </div>
        </motion.div>
    );
};

export default StockCard;
