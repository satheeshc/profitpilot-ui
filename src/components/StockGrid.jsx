import React from 'react';
import { motion } from 'framer-motion';
import StockCard from './StockCard';

const StockGrid = ({ stocks, onCardClick }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Stock Ticker View</h2>
                <p className="text-slate-500 dark:text-slate-400">Popular US stocks with live market data</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {stocks.map((stock, index) => (
                    <StockCard key={stock.symbol} stock={stock} index={index} onCardClick={onCardClick} />
                ))}
            </div>
        </motion.section>
    );
};

export default StockGrid;
