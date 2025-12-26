import React, { useEffect, useState } from 'react';
import { fetchDeepValueStocks, analyzeStock } from '../services/stockService';
import { Shield, TrendingUp, Clock, Info } from 'lucide-react';

const DeepValueList = ({ onStocksLoaded, onCardClick }) => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        const loadStocks = async () => {
            const data = await fetchDeepValueStocks();
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
                    <Shield className="text-blue-400" />
                    Deep Value Picks
                </h2>
                <div className="text-gray-400 p-4 text-center border border-dashed border-gray-700 rounded-lg">
                    No stocks currently match the strict Graham-style value criteria.
                </div>
            </div>
        );
    }

    const handleCardClick = async (stock) => {
        if (!onCardClick) return;

        try {
            // Fetch full stock analysis for the modal
            const fullStockData = await analyzeStock(stock.symbol);
            if (fullStockData) {
                // Ensure name is preserved for the modal tooltip
                onCardClick({ ...fullStockData, name: stock.name || fullStockData.name });
            }
        } catch (error) {
            console.error('Error fetching stock details:', error);
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 p-6 rounded-xl border-2 border-blue-500/30 backdrop-blur-sm">
            {/* Header with Info Button */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Shield className="text-blue-400 w-8 h-8" />
                        <h2 className="text-2xl font-bold text-white">
                            Deep Value Picks
                        </h2>
                        <button
                            onClick={() => setShowInfo(!showInfo)}
                            className="ml-2 p-1.5 hover:bg-blue-500/20 rounded-full transition-colors"
                        >
                            <Info className="w-5 h-5 text-blue-400" />
                        </button>
                    </div>
                    <span className="text-xs font-normal text-gray-400 bg-blue-900/30 px-3 py-1.5 rounded-full border border-blue-500/30">
                        Graham-Style Value Investing
                    </span>
                </div>

                {/* Info Panel */}
                {showInfo && (
                    <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mb-4">
                        <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-400" />
                            Long-Term Investment Strategy
                        </h3>
                        <div className="text-sm text-gray-300 space-y-2">
                            <p>
                                <strong className="text-blue-400">Purpose:</strong> These stocks are selected using Benjamin Graham's conservative value investing principles.
                            </p>
                            <p>
                                <strong className="text-blue-400">Criteria:</strong> Low P/E (&lt;15), Low P/B (&lt;1.5), High ROE (&gt;10%), Strong Balance Sheet (Current Ratio &gt;2, Low Debt)
                            </p>
                            <p className="bg-amber-500/10 border border-amber-500/30 rounded p-2 text-amber-200">
                                <strong>⏳ Time Horizon:</strong> These investments typically take <strong>2-5 years</strong> to realize their full value.
                                They are not for quick gains but for patient, long-term wealth building.
                            </p>
                            <p className="text-xs italic text-gray-400">
                                "The stock market is a device for transferring money from the impatient to the patient." - Warren Buffett
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Stock Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stocks.map(stock => (
                    <div
                        key={stock.symbol}
                        onClick={() => handleCardClick(stock)}
                        className="bg-gray-800/50 p-4 rounded-lg border border-blue-500/30 hover:border-blue-400/50 transition-all hover:transform hover:-translate-y-1 cursor-pointer group"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors" title={stock.name}>{stock.symbol}</h3>
                                <p className="text-xs text-gray-400">Deep Value</p>
                            </div>
                            <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-medium border border-blue-500/30">
                                UNDERVALUED
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between border-b border-gray-700/50 pb-1">
                                <span className="text-gray-400">P/E Ratio</span>
                                <span className="text-blue-400 font-mono">{stock.pe.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700/50 pb-1">
                                <span className="text-gray-400">P/B Ratio</span>
                                <span className="text-blue-400 font-mono">{stock.pb.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700/50 pb-1">
                                <span className="text-gray-400">ROE</span>
                                <span className="text-green-400 font-mono">{stock.roe.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700/50 pb-1">
                                <span className="text-gray-400">Current Ratio</span>
                                <span className="text-green-400 font-mono">{stock.currentRatio.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">5Y EPS Growth</span>
                                <span className="text-green-400 font-mono">{stock.epsGrowth5Y.toFixed(1)}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Educational Footer */}
            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-blue-300 mb-1">
                            Patient Capital Required
                        </p>
                        <p className="text-xs text-gray-400">
                            These stocks are selected for their fundamental strength and undervaluation.
                            Market recognition of their true value typically takes <strong>2-5 years</strong>.
                            Ideal for retirement accounts and long-term portfolios.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeepValueList;
