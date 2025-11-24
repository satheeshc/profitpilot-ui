import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SignalListModal = ({ isOpen, onClose, title, stocks, type }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                >
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                        <h3 className={`text-xl font-bold ${type === 'buy' ? 'text-emerald-500' : 'text-red-500'}`}>
                            {title}
                        </h3>
                        <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                            <X className="w-5 h-5 text-slate-500" />
                        </button>
                    </div>

                    <div className="p-4 max-h-[60vh] overflow-y-auto">
                        {stocks.length === 0 ? (
                            <p className="text-center text-slate-500 py-4">No stocks found.</p>
                        ) : (
                            <div className="space-y-3">
                                {stocks.map(stock => (
                                    <div key={stock.symbol} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white">{stock.symbol}</p>
                                            <p className="text-xs text-slate-500">{stock.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-slate-900 dark:text-white">${stock.price}</p>
                                            <p className={`text-xs font-bold ${stock.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                                {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SignalListModal;
