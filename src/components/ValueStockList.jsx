import React, { useEffect, useState } from 'react';
import { fetchValueStocks } from '../services/stockService';
import { TrendingUp, DollarSign, Percent, Activity } from 'lucide-react';

const ValueStockList = ({ onStocksLoaded }) => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStocks = async () => {
            const data = await fetchValueStocks();
            setStocks(data);
            setLoading(false);

            // Notify parent of the symbols in this list
            if (onStocksLoaded) {
                onStocksLoaded(data.map(s => s.symbol));
            }
        };
        loadStocks();
    }, [onStocksLoaded]);

    if (loading) {
        return (
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm animate-pulse">
                <div className="h-8 bg-gray-800 rounded w-1/3 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-40 bg-gray-800 rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (stocks.length === 0) {
        return (
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="text-green-400" />
                    Value Stock Gems
                </h2>
                <div className="text-gray-400 p-4 text-center border border-dashed border-gray-700 rounded-lg">
                    No stocks currently match the strict value criteria.
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="text-green-400" />
                High-Profit Quality Stocks
                <span className="text-xs font-normal text-gray-400 ml-2 bg-gray-800 px-2 py-1 rounded-full">
                    Criteria: High Margin, Growth, & ROE
                </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stocks.map(stock => (
                    <div key={stock.symbol} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all hover:transform hover:-translate-y-1 cursor-pointer group">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{stock.symbol}</h3>
                                <p className="text-xs text-gray-400">Quality Score: Excellent</p>
                            </div>
                            <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium border border-green-500/30">
                                PROFITABLE
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1">
                                <span className="text-gray-400">Net Margin</span>
                                <span className="text-green-400 font-mono">{stock.netMargin.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700/50 pb-1">
                                <span className="text-gray-400">EPS Growth</span>
                                <span className="text-green-400 font-mono">{stock.epsGrowth.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700/50 pb-1">
                                <span className="text-gray-400">ROE</span>
                                <span className="text-green-400 font-mono">{stock.roe.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700/50 pb-1">
                                <span className="text-gray-400">PE Ratio</span>
                                <span className="text-white font-mono">{stock.pe.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Div Yield</span>
                                <span className="text-green-400 font-mono">{stock.divYield.toFixed(2)}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ValueStockList;
