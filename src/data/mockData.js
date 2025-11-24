// Mock data for US stocks with realistic prices and trends
export const mockStocks = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 189.50,
        change: 2.34,
        changePercent: 1.25,
        signal: 'strong-buy',
        winRate: 87,
        targetPrice: 197.00,
        stopLoss: 182.00,
        trend: [185, 186, 184, 187, 188, 189, 190, 189.5],
        volume: '52.3M',
        marketCap: '2.95T'
    },
    {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        price: 242.80,
        change: 8.45,
        changePercent: 3.60,
        signal: 'strong-buy',
        winRate: 82,
        targetPrice: 260.00,
        stopLoss: 230.00,
        trend: [230, 232, 235, 238, 240, 241, 243, 242.8],
        volume: '98.7M',
        marketCap: '770B'
    },
    {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        price: 495.20,
        change: 12.30,
        changePercent: 2.55,
        signal: 'strong-buy',
        winRate: 91,
        targetPrice: 515.00,
        stopLoss: 475.00,
        trend: [475, 480, 485, 488, 490, 492, 494, 495.2],
        volume: '45.2M',
        marketCap: '1.22T'
    },
    {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 141.30,
        change: 1.85,
        changePercent: 1.33,
        signal: 'strong-buy',
        winRate: 85,
        targetPrice: 147.00,
        stopLoss: 136.00,
        trend: [138, 139, 140, 139, 140, 141, 142, 141.3],
        volume: '28.5M',
        marketCap: '1.78T'
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 378.90,
        change: 4.20,
        changePercent: 1.12,
        signal: 'strong-buy',
        winRate: 88,
        targetPrice: 394.00,
        stopLoss: 365.00,
        trend: [370, 372, 375, 376, 377, 378, 379, 378.9],
        volume: '22.1M',
        marketCap: '2.82T'
    },
    {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        price: 148.60,
        change: 2.10,
        changePercent: 1.43,
        signal: 'buy',
        winRate: 79,
        targetPrice: 155.00,
        stopLoss: 142.00,
        trend: [144, 145, 146, 147, 148, 149, 148, 148.6],
        volume: '41.3M',
        marketCap: '1.54T'
    },
    {
        symbol: 'META',
        name: 'Meta Platforms Inc.',
        price: 338.50,
        change: -2.80,
        changePercent: -0.82,
        signal: 'sell',
        winRate: 65,
        targetPrice: 330.00,
        stopLoss: 345.00,
        trend: [345, 344, 342, 341, 340, 339, 338, 338.5],
        volume: '18.9M',
        marketCap: '860B'
    },
    {
        symbol: 'AMC',
        name: 'AMC Entertainment',
        price: 4.85,
        change: -0.35,
        changePercent: -6.73,
        signal: 'strong-sell',
        winRate: 45,
        targetPrice: 4.20,
        stopLoss: 5.50,
        trend: [5.5, 5.3, 5.1, 5.0, 4.9, 4.88, 4.86, 4.85],
        volume: '32.5M',
        marketCap: '1.58B'
    },
    {
        symbol: 'NFLX',
        name: 'Netflix Inc.',
        price: 485.30,
        change: -5.20,
        changePercent: -1.06,
        signal: 'sell',
        winRate: 58,
        targetPrice: 470.00,
        stopLoss: 495.00,
        trend: [495, 492, 490, 488, 487, 486, 485, 485.3],
        volume: '5.8M',
        marketCap: '209B'
    },
    {
        symbol: 'DIS',
        name: 'The Walt Disney Company',
        price: 92.40,
        change: 0.80,
        changePercent: 0.87,
        signal: 'buy',
        winRate: 72,
        targetPrice: 96.00,
        stopLoss: 88.00,
        trend: [90, 91, 91.5, 92, 92.2, 92.3, 92.5, 92.4],
        volume: '12.3M',
        marketCap: '169B'
    },
    {
        symbol: 'AMD',
        name: 'Advanced Micro Devices',
        price: 122.75,
        change: 3.45,
        changePercent: 2.89,
        signal: 'strong-buy',
        winRate: 84,
        targetPrice: 128.00,
        stopLoss: 117.00,
        trend: [118, 119, 120, 121, 122, 123, 122.5, 122.75],
        volume: '67.2M',
        marketCap: '198B'
    },
    {
        symbol: 'COIN',
        name: 'Coinbase Global Inc.',
        price: 168.90,
        change: -8.50,
        changePercent: -4.79,
        signal: 'strong-sell',
        winRate: 42,
        targetPrice: 155.00,
        stopLoss: 180.00,
        trend: [180, 178, 175, 172, 170, 169, 168.5, 168.9],
        volume: '15.4M',
        marketCap: '40.2B'
    }
];

// Calculate portfolio recommendations based on budget
export const calculatePortfolio = (budget, stocks) => {
    // Filter strong buy stocks and sort by win rate
    // Filter strong buy and buy stocks, prioritizing strong-buy
    const strongBuyStocks = stocks
        .filter(stock => stock.signal === 'strong-buy' || stock.signal === 'buy')
        .sort((a, b) => {
            // Prioritize strong-buy
            if (a.signal === 'strong-buy' && b.signal !== 'strong-buy') return -1;
            if (b.signal === 'strong-buy' && a.signal !== 'strong-buy') return 1;
            // Then sort by win rate
            return b.winRate - a.winRate;
        });

    const portfolio = [];
    let remainingBudget = budget;

    // Distribute budget across top strong buy stocks
    for (const stock of strongBuyStocks) {
        if (remainingBudget < stock.price) continue;

        const maxShares = Math.floor(remainingBudget / stock.price);
        // Allocate proportionally, but at least 1 share if affordable
        const shares = Math.max(1, Math.min(maxShares, Math.floor(budget * 0.25 / stock.price)));

        if (shares > 0) {
            const totalCost = shares * stock.price;
            const projectedProfit = totalCost * 0.04; // 4% target

            portfolio.push({
                ...stock,
                recommendedShares: shares,
                totalCost: totalCost,
                projectedProfit: projectedProfit
            });

            remainingBudget -= totalCost;
        }

        // Stop if we've allocated most of the budget
        if (remainingBudget < budget * 0.1) break;
    }

    return {
        portfolio,
        totalInvested: budget - remainingBudget,
        remainingBudget,
        totalProjectedProfit: portfolio.reduce((sum, item) => sum + item.projectedProfit, 0)
    };
};

// Get stocks by signal type
export const getStocksBySignal = (stocks, signal) => {
    return stocks.filter(stock => stock.signal === signal);
};

// Format currency
export const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
};

// Format percentage
export const formatPercent = (value) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
};

// Format large numbers (for market cap, volume)
export const formatLargeNumber = (value) => {
    if (typeof value === 'string') return value;

    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toFixed(2)}`;
};
