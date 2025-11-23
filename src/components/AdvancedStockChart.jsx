import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '../data/mockData';

const AdvancedStockChart = ({ data, symbol, height = 300 }) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-500 dark:text-slate-400">
                No chart data available
            </div>
        );
    }

    // Determine if trend is positive
    const isPositive = data[data.length - 1].value >= data[0].value;

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {formatCurrency(payload[0].value)}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {payload[0].payload.date}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full" style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor={isPositive ? '#10b981' : '#ef4444'}
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor={isPositive ? '#10b981' : '#ef4444'}
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickLine={false}
                        tickFormatter={(value) => `$${value.toFixed(0)}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={isPositive ? '#10b981' : '#ef4444'}
                        strokeWidth={2}
                        fill={`url(#gradient-${symbol})`}
                        animationDuration={1000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AdvancedStockChart;
