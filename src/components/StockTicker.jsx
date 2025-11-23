import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercent } from '../data/mockData';

const StockTicker = ({ stocks }) => {
    // Duplicate stocks to create seamless scrolling effect
    const tickerStocks = [...stocks, ...stocks, ...stocks];

    return (
        <div className="w-full bg-slate-900 border-b border-slate-800 overflow-hidden py-2">
            <div className="flex items-center whitespace-nowrap ticker-scroll hover:pause-animation">
                {tickerStocks.map((stock, index) => (
                    <div key={`${stock.symbol}-${index}`} className="inline-flex items-center space-x-3 px-6 border-r border-slate-800">
                        <span className="font-bold text-slate-200">{stock.symbol}</span>
                        <span className="text-slate-300">{formatCurrency(stock.price)}</span>
                        <div className={`flex items-center space-x-1 ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            <span className="text-xs font-medium">{formatPercent(stock.changePercent)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockTicker;
