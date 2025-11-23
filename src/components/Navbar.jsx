import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Search, X, Loader } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { searchStocks, fetchStockQuote, fetchCompanyProfile, analyzeStock } from '../services/stockService';

const Navbar = ({ stocks = [], onStockClick, marketStatus = 'closed' }) => {
    const { theme, toggleTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef(null);

    // Handle click outside to close search results
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim() === '') {
                setSearchResults([]);
                return;
            }

            setIsSearching(true);
            try {
                // First check local stocks for instant results
                const localResults = stocks.filter(stock =>
                    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
                ).map(stock => ({
                    description: stock.name,
                    displaySymbol: stock.symbol,
                    symbol: stock.symbol,
                    type: 'Common Stock',
                    isLocal: true,
                    ...stock
                }));

                // Then search API
                const apiResults = await searchStocks(searchQuery);

                // Merge results, removing duplicates (prefer local data)
                const seen = new Set(localResults.map(r => r.symbol));
                const uniqueApiResults = apiResults.filter(r => !seen.has(r.symbol) && !r.symbol.includes('.')); // Filter out non-US exchanges for simplicity if needed

                setSearchResults([...localResults, ...uniqueApiResults].slice(0, 8));
            } catch (error) {
                console.error('Search failed:', error);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, stocks]);

    const handleSearchSelect = async (result) => {
        setSearchQuery('');
        setShowResults(false);

        if (result.isLocal) {
            if (onStockClick) onStockClick(result);
        } else {
            // Fetch full data for new stock
            try {
                // Use the backend's analyze endpoint which returns quote, profile, and calculated signals
                const analysis = await analyzeStock(result.symbol);

                if (analysis) {
                    const newStock = {
                        symbol: result.symbol,
                        name: analysis.profile?.name || result.description,
                        price: analysis.quote?.c || 0,
                        change: analysis.quote?.d || 0,
                        changePercent: analysis.quote?.dp || 0,
                        highPrice: analysis.quote?.h || 0,
                        lowPrice: analysis.quote?.l || 0,
                        openPrice: analysis.quote?.o || 0,
                        previousClose: analysis.quote?.pc || 0,
                        marketCap: analysis.profile?.marketCapitalization
                            ? `${(analysis.profile.marketCapitalization / 1000).toFixed(2)}B`
                            : 'N/A',
                        volume: 'N/A',
                        signal: analysis.signal || 'neutral',
                        winRate: analysis.winRate || 50,
                        targetPrice: analysis.targetPrice || analysis.quote?.c || 0,
                        stopLoss: analysis.stopLoss || (analysis.quote?.c * 0.95) || 0,
                        trend: Array(7).fill(0).map(() => (analysis.quote?.c || 0) + (Math.random() - 0.5) * 5)
                    };

                    if (onStockClick) onStockClick(newStock);
                }
            } catch (error) {
                console.error('Failed to load stock details:', error);
            }
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 glass border-b border-slate-200 dark:border-slate-700"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center space-x-3"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <div className="hidden md:block">
                            <h1 className="text-xl font-bold gradient-text">ProfitSignal</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">AI Investment Advisor</p>
                        </div>
                    </motion.div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-md mx-4 relative" ref={searchRef}>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search any stock (e.g. NVDA, AMD)..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowResults(true);
                                }}
                                onFocus={() => setShowResults(true)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white placeholder-slate-400"
                            />
                            {isSearching ? (
                                <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin" />
                            ) : searchQuery && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSearchResults([]);
                                    }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Search Results Dropdown */}
                        <AnimatePresence>
                            {showResults && searchResults.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden max-h-96 overflow-y-auto"
                                >
                                    {searchResults.map((result) => (
                                        <button
                                            key={result.symbol}
                                            onClick={() => handleSearchSelect(result)}
                                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700/50 last:border-0 text-left"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                                                    {result.symbol[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white">{result.symbol}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                                                        {result.description || result.name}
                                                    </p>
                                                </div>
                                            </div>
                                            {result.isLocal && (
                                                <div className="text-right">
                                                    <p className="font-medium text-slate-900 dark:text-white">${result.price.toFixed(2)}</p>
                                                    <p className={`text-xs font-bold ${result.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                                        {result.change >= 0 ? '+' : ''}{result.changePercent.toFixed(2)}%
                                                    </p>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-2">
                        {/* Market Status Indicator */}
                        <div className={`hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full glass mr-2 border ${marketStatus === 'open'
                            ? 'border-emerald-500/30 bg-emerald-500/10'
                            : 'border-red-500/30 bg-red-500/10'
                            }`}>
                            <div className={`w-2 h-2 rounded-full ${marketStatus === 'open' ? 'bg-emerald-500 pulse-glow' : 'bg-red-500'
                                }`}></div>
                            <span className={`text-xs font-bold ${marketStatus === 'open' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                                }`}>
                                Market {marketStatus === 'open' ? 'Open' : 'Closed'}
                            </span>
                        </div>

                        {/* Theme Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-xl glass hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-emerald-500" />
                            ) : (
                                <Moon className="w-5 h-5 text-blue-500" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
